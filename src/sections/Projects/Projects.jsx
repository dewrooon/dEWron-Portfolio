import './Projects.css'
import SectionHeading from '../../components/SectionHeading'
import ProjectCard from './components/ProjectCard'
import useProjects from '../../hooks/useProjects'

export default function Projects() {
  const { projects, isLoading, error, reload } = useProjects()

  return (
    <section className="projects section container" id="projects" aria-labelledby="projects-title">
      <SectionHeading number="03" label="ПРОЕКТЫ" title="От идеи — к интерфейсу." id="projects-title" />
      <p className="projects__intro">Здесь собраны мои проекты, используемые технологии и результаты работы.</p>
      {isLoading && <p className="projects__message" role="status">Загружаю проекты…</p>}
      {error && <div className="projects__message" role="alert"><p>{error}</p><button className="button" onClick={reload}>Загрузить ещё раз</button></div>}
      {!isLoading && !error && projects.length === 0 && <p className="projects__message" role="status">Пока здесь нет проектов. Загляните позже!</p>}
      <div className="projects__grid" aria-busy={isLoading}>
        {projects.map((project, index) => <ProjectCard key={index} project={project} number={index + 1} />)}
      </div>
    </section>
  )
}
