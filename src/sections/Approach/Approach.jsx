import './Approach.css'
import SectionHeading from '../../components/SectionHeading'

const principles = [
  { title: 'Чистый код', description: 'Понятные имена, единые стандарты и решения, в которых легко разобраться.' },
  { title: 'Продуманная архитектура', description: 'Логичная организация файлов и переиспользуемые компоненты для развития проекта.' },
  { title: 'Минимум лишнего', description: 'У каждого решения — конкретное назначение. В центре внимания — польза для проекта.' },
]

export default function Approach() {
  return (
    <section className="approach section container" id="approach">
      <div className="approach__intro"><SectionHeading number="05" label="МОЙ ПОДХОД" title={<>Хороший интерфейс.<br /><span>Хороший код внутри.</span></>} /><p className="approach__description">Я считаю, что качественный веб-проект должен быть не только визуально привлекательным, но и технически понятным. Поэтому уделяю внимание организации файлов, повторному использованию компонентов и простоте дальнейшей поддержки.</p></div>
      <div className="approach__principles">{principles.map((principle, index) => <article className="principle" key={principle.title}><span className="principle__number">0{index + 1}</span><div><h3 className="principle__title">{principle.title}</h3><p className="principle__description">{principle.description}</p></div></article>)}</div>
    </section>
  )
}
