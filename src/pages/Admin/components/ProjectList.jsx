import { Eye, EyeOff, FolderKanban, Pencil, Star, Trash2 } from 'lucide-react'

export default function ProjectList({ projects, busy, onEdit, onTogglePublish, onDelete }) {
  if (!projects.length) {
    return (
      <div className="admin-projects__empty" role="status">
        <FolderKanban size={36} aria-hidden="true" />
        <h2>{busy ? 'Загружаем проекты…' : 'Пока нет проектов'}</h2>
        {!busy && <p>Добавьте первый проект, чтобы представить свою работу в портфолио.</p>}
      </div>
    )
  }

  return (
    <div className="admin-projects" aria-busy={busy}>
      {projects.map((project) => (
        <article className="admin-projects__card" key={project.id}>
          <div className="admin-projects__content">
            <div className="admin-projects__statuses">
              <span className={`admin-projects__status${project.is_published ? ' admin-projects__status--live' : ''}`}>{project.is_published ? 'Опубликован' : 'Черновик'}</span>
              {project.is_published && project.is_featured && <span className="admin-projects__featured"><Star size={13} aria-hidden="true" />Избранный</span>}
            </div>
            <h2 className="admin-projects__title">{project.title}</h2>
            <p className="admin-projects__description">{project.description || 'Описание пока не добавлено.'}</p>
            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <ul className="admin-projects__tags" aria-label="Технологии проекта">{[...new Set(project.technologies)].map((technology) => <li key={technology}>{technology}</li>)}</ul>
            )}
          </div>
          <div className="admin-projects__actions">
            <button className="admin__button" type="button" disabled={busy} onClick={() => onTogglePublish(project)} aria-label={`${project.is_published ? 'Скрыть' : 'Опубликовать'} проект «${project.title}»`}>
              {project.is_published ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
              {project.is_published ? 'Скрыть' : 'Опубликовать'}
            </button>
            <button className="admin__button" type="button" disabled={busy} onClick={() => onEdit(project)} aria-label={`Редактировать проект «${project.title}»`}><Pencil size={17} aria-hidden="true" /><span>Изменить</span></button>
            <button className="admin__button admin__button--danger" type="button" disabled={busy} onClick={() => onDelete(project)} aria-label={`Удалить проект «${project.title}»`}><Trash2 size={17} aria-hidden="true" /><span>Удалить</span></button>
          </div>
        </article>
      ))}
    </div>
  )
}
