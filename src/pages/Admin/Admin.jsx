import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Plus, LogOut, ExternalLink } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { fetchAdminProjects, saveAdminProject, deleteAdminProject } from '../../services/adminProjects'
import useAdminAccess from './useAdminAccess'
import AdminLogin from './components/AdminLogin'
import ProjectEditor from './components/ProjectEditor'
import ProjectList from './components/ProjectList'
import './Admin.css'

function AdminWorkspace({ user }) {
  const [page, setPage] = useState('dashboard')
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [loadError, setLoadError] = useState('')
  const request = useRef(null)
  const operationLock = useRef(false)
  const active = useRef(true)

  const loadProjects = useCallback(async () => {
    request.current?.abort()
    const controller = new AbortController()
    request.current = controller
    setLoading(true)
    setLoadError('')
    try {
      const data = await fetchAdminProjects(controller.signal)
      if (active.current && !controller.signal.aborted) setProjects(data)
    } catch (error) {
      if (active.current && !controller.signal.aborted) setLoadError('Не удалось загрузить проекты: ' + error.message)
    } finally {
      if (active.current && !controller.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    active.current = true
    loadProjects()
    return () => {
      active.current = false
      request.current?.abort()
    }
  }, [loadProjects])

  async function performOperation(action, successMessage) {
    if (operationLock.current) return false
    operationLock.current = true
    setBusy(true)
    setMessage('')
    try {
      await action()
      if (!active.current) return false
      setMessage(successMessage)
      await loadProjects()
      return active.current
    } catch (error) {
      if (active.current) setMessage('Ошибка: ' + (error.message || 'Проверьте подключение.'))
      return false
    } finally {
      operationLock.current = false
      if (active.current) setBusy(false)
    }
  }

  function navigate(nextPage, project = null) {
    if (busy) return
    if (page === 'editor' && !window.confirm('Закрыть редактор? Несохранённые изменения будут потеряны.')) return
    setEditingProject(project)
    setMessage('')
    setPage(nextPage)
  }

  async function saveProject(payload) {
    if (editingProject && editingProject.id == null) {
      setMessage('У проекта нет id. Редактирование невозможно.')
      return false
    }
    const saved = await performOperation(() => saveAdminProject(payload, editingProject?.id ?? null), 'Проект сохранён')
    if (saved) {
      setEditingProject(null)
      setPage('projects')
    }
    return saved
  }

  function togglePublish(project) {
    if (project.id == null) {
      setMessage('У проекта нет id. Изменение публикации невозможно.')
      return
    }
    return performOperation(() => saveAdminProject({
      is_published: !project.is_published,
      is_featured: !project.is_published && project.is_featured === true,
    }, project.id), project.is_published ? 'Проект скрыт' : 'Проект опубликован')
  }

  function deleteProject(project) {
    if (!window.confirm(`Удалить проект «${project.title}»? Это действие нельзя отменить.`)) return
    return performOperation(() => deleteAdminProject(project.id), 'Проект удалён')
  }

  async function logout() {
    if (busy) return
    if (page === 'editor' && !window.confirm('Выйти без сохранения изменений?')) return
    setBusy(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      setMessage('Ошибка выхода: ' + error.message)
    } finally {
      if (active.current) setBusy(false)
    }
  }

  const publishedCount = projects.filter((project) => project.is_published).length
  const title = page === 'dashboard' ? 'Панель управления' : page === 'projects' ? 'Мои проекты' : editingProject ? 'Редактирование проекта' : 'Новый проект'
  const stats = [
    ['Всего проектов', projects.length],
    ['Опубликовано', publishedCount],
    ['Черновики', projects.length - publishedCount],
  ]

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Link to="/" className="admin__brand">dEWron<span>.</span></Link>
        <p className="admin__subtitle">PORTFOLIO MANAGER</p>
        <nav className="admin__nav" aria-label="Управление портфолио">
          <button className={`admin__nav-button${page === 'dashboard' ? ' admin__nav-button--active' : ''}`} aria-current={page === 'dashboard' ? 'page' : undefined} disabled={busy} onClick={() => navigate('dashboard')}><LayoutDashboard size={18} aria-hidden="true" /> Обзор</button>
          <button className={`admin__nav-button${page === 'projects' ? ' admin__nav-button--active' : ''}`} aria-current={page === 'projects' ? 'page' : undefined} disabled={busy} onClick={() => navigate('projects')}><FolderKanban size={18} aria-hidden="true" /> Проекты</button>
          <button className={`admin__nav-button${page === 'editor' ? ' admin__nav-button--active' : ''}`} disabled={busy} onClick={() => navigate('editor')}><Plus size={18} aria-hidden="true" /> Добавить проект</button>
        </nav>
        <button className="admin__logout" disabled={busy} onClick={logout}><LogOut size={18} aria-hidden="true" /> Выйти</button>
      </aside>
      <main className="admin__main">
        <header className="admin__header"><div><h1>{title}</h1><p className="admin__description">{user.email}</p></div><Link to="/" target="_blank" rel="noreferrer">Открыть сайт <ExternalLink size={16} aria-hidden="true" /></Link></header>
        <p className="admin__message" role="status" aria-atomic="true">{message}</p>
        {loadError && <div className="admin__message" role="alert"><p>{loadError}</p><button className="admin__button" onClick={loadProjects} disabled={busy || loading}>Повторить загрузку</button></div>}
        {loading && <p className="admin__loading" role="status">Загрузка проектов…</p>}
        {page === 'dashboard' && <><div className="admin__stats">{stats.map(([label, value]) => <div className="admin__stat" key={label}><span>{label}</span><strong>{loading || loadError ? '—' : value}</strong></div>)}</div><button className="admin__button admin__button--primary" disabled={busy} onClick={() => navigate('editor')}><Plus size={18} aria-hidden="true" /> Создать проект</button></>}
        {page === 'projects' && <><div className="admin__actions"><button className="admin__button admin__button--primary" disabled={busy} onClick={() => navigate('editor')}><Plus size={18} aria-hidden="true" /> Новый проект</button></div>{!loading && !loadError && <ProjectList projects={projects} busy={busy} onEdit={(project) => navigate('editor', project)} onTogglePublish={togglePublish} onDelete={deleteProject} />}</>}
        {page === 'editor' && <ProjectEditor key={editingProject?.id ?? 'new'} initialProject={editingProject} busy={busy} onSave={saveProject} onCancel={() => navigate('projects')} />}
      </main>
    </div>
  )
}

export default function Admin() {
  const { checking, user, authorized, error } = useAdminAccess()
  const [logoutError, setLogoutError] = useState('')

  async function logout() {
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
    } catch {
      setLogoutError('Не удалось выйти. Попробуйте снова.')
    }
  }

  if (checking) return <main className="admin-login"><p role="status">Проверка доступа…</p></main>
  if (!user) return <AdminLogin accessError={error} />
  if (!authorized) return <main className="admin-login"><div className="admin-login__panel"><h1>Доступ запрещён</h1><p>У этой учётной записи нет прав администратора.</p><button className="admin__button" onClick={logout}>Выйти</button><p role="status">{logoutError}</p></div></main>
  return <AdminWorkspace key={user.id} user={user} />
}
