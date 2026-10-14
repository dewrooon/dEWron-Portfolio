import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/projects'

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [request, setRequest] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await fetchProjects(controller.signal)
        if (!controller.signal.aborted) setProjects(data)
      } catch {
        if (!controller.signal.aborted) setError('Не удалось загрузить проекты. Попробуйте ещё раз.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [request])

  function reload() {
    setError('')
    setIsLoading(true)
    setRequest((value) => value + 1)
  }

  return { projects, isLoading, error, reload }
}
