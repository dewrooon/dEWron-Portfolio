import ProjectPreview from './ProjectPreview'

export default function ProjectCard({ project, number }) {
  return (
    <article className="project-card">
      <ProjectPreview imageUrl={project.imageUrl} title={project.title} />
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__number">/ {String(number).padStart(2, '0')}</span>
          {project.isFeatured && <span className="project-card__featured">Избранный</span>}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        {project.description && <p className="project-card__description">{project.description}</p>}
        {project.technologies.length > 0 && <ul className="project-card__tags" aria-label="Технологии проекта">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>}
        {(project.projectUrl || project.githubUrl) && (
          <div className="project-card__links">
            {project.projectUrl && <a className="project-card__link" href={project.projectUrl} target="_blank" rel="noreferrer">Открыть проект <span aria-hidden="true">↗</span></a>}
            {project.githubUrl && <a className="project-card__link" href={project.githubUrl} target="_blank" rel="noreferrer">Код на GitHub <span aria-hidden="true">↗</span></a>}
          </div>
        )}
      </div>
    </article>
  )
}
