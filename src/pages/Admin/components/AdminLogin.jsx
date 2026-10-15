import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

export default function AdminLogin({ accessError }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function login(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (loginError) throw loginError
      setPassword('')
    } catch (cause) {
      setError('Ошибка входа: ' + (cause.message || 'Проверьте подключение.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login__panel">
        <Link to="/">← Вернуться на сайт</Link>
        <h1 className="admin-login__title">Управление сайтом dEWron</h1>
        <p className="admin-login__description">Войдите, чтобы управлять проектами в портфолио.</p>
        <form className="admin-login__form" onSubmit={login} aria-busy={busy}>
          <label className="admin-login__field">Электронная почта
            <input className="admin-login__input" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} />
          </label>
          <label className="admin-login__field">Пароль
            <input className="admin-login__input" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} />
          </label>
          <button className="admin__button admin__button--primary" disabled={busy}>{busy ? 'Проверка…' : 'Войти'}</button>
        </form>
        <p className="admin-login__status" role="status">{error || accessError}</p>
      </div>
    </main>
  )
}
