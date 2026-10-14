import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function useAdminAccess() {
  const [access, setAccess] = useState({ checking: true, user: null, authorized: false, error: '' })

  useEffect(() => {
    let active = true
    let revision = 0
    let verifiedUserId = null
    let timer

    async function checkAccess() {
      const currentRevision = ++revision
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError
        if (!session) {
          if (active && currentRevision === revision) {
            verifiedUserId = null
            setAccess({ checking: false, user: null, authorized: false, error: '' })
          }
          return
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        const { data, error } = await supabase.rpc('is_admin')
        if (error) throw error
        if (active && currentRevision === revision) {
          verifiedUserId = user?.id ?? null
          setAccess({ checking: false, user, authorized: data === true, error: '' })
        }
      } catch {
        if (active && currentRevision === revision) {
          setAccess({ checking: false, user: null, authorized: false, error: 'Не удалось проверить доступ. Повторите вход или обновите страницу.' })
        }
      }
    }

    checkAccess()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        ++revision
        verifiedUserId = null
        setAccess({ checking: false, user: null, authorized: false, error: '' })
        return
      }
      if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') return
      if (event === 'SIGNED_IN' && verifiedUserId === session?.user.id) return
      // Run SDK calls outside the auth callback to avoid holding its session lock.
      clearTimeout(timer)
      setAccess({ checking: true, user: null, authorized: false, error: '' })
      timer = setTimeout(checkAccess, 0)
    })

    return () => {
      active = false
      ++revision
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [])

  return access
}
