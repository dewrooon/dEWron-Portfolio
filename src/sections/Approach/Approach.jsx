import './Approach.css'
import SectionHeading from '../../components/SectionHeading'

const principles = [
  { title: 'Понятный код', description: 'Даю файлам и переменным ясные имена и придерживаюсь единых правил, чтобы в коде было легко разобраться.' },
  { title: 'Удобная структура', description: 'Организую файлы и компоненты так, чтобы проект было проще развивать.' },
  { title: 'Только нужное', description: 'Не усложняю без необходимости: каждое решение должно помогать проекту.' },
]

export default function Approach() {
  return (
    <section className="approach section container" id="approach">
      <div className="approach__intro"><SectionHeading number="05" label="МОЙ ПОДХОД" title={<>Хороший интерфейс.<br /><span>Понятный код.</span></>} /><p className="approach__description">Сайт должен быть не только красивым, но и удобным для тех, кто будет его развивать. Поэтому я продумываю структуру проекта, повторно использую компоненты и стараюсь упростить дальнейшую поддержку.</p></div>
      <div className="approach__principles">{principles.map((principle, index) => <article className="principle" key={principle.title}><span className="principle__number">0{index + 1}</span><div><h3 className="principle__title">{principle.title}</h3><p className="principle__description">{principle.description}</p></div></article>)}</div>
    </section>
  )
}
