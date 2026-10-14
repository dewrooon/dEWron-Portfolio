import './Services.css'
import { FiLayout, FiGrid, FiCode, FiDatabase, FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../../components/SectionHeading'

const services = [
  { title: 'Сайты-визитки', description: 'Современные адаптивные сайты для представления компании, её услуг и контактной информации.', icon: FiLayout, tag: 'ПЕРВОЕ ВПЕЧАТЛЕНИЕ' },
  { title: 'Корпоративные сайты', description: 'Структурированные веб-сайты для бизнеса с информацией о компании, продуктах и направлениях деятельности.', icon: FiGrid, tag: 'ПРИСУТСТВИЕ БИЗНЕСА' },
  { title: 'Frontend-разработка', description: 'Разработка пользовательских интерфейсов на JavaScript и React с использованием переиспользуемых компонентов.', icon: FiCode, tag: 'ОТ ИДЕИ К ИНТЕРФЕЙСУ' },
  { title: 'Интеграция веб-сервисов', description: 'Подключение баз данных и облачных сервисов, включая Supabase, в соответствии с требованиями проекта.', icon: FiDatabase, tag: 'БОЛЬШЕ ВОЗМОЖНОСТЕЙ' },
]

function ServiceCard({ title, description, icon: Icon, tag, index }) {
  return (
    <article className="service-card">
      <div className="service-card__top"><span className="service-card__icon"><Icon aria-hidden="true" /></span><span className="service-card__number">0{index + 1}</span></div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
      <a className="service-card__link" href="#contact"><span>{tag}</span><FiArrowUpRight aria-hidden="true" /><span className="service-card__accessible"> — обсудить услугу: {title}</span></a>
    </article>
  )
}

export default function Services() {
  return (
    <section className="services section container" id="services">
      <SectionHeading number="02" label="ЧЕМ МОГУ ПОМОЧЬ" title="Ваши задачи. Мои решения." description="От первого сайта до продуманного интерфейса — с вниманием к каждой детали." />
      <div className="services__grid">{services.map((service, index) => <ServiceCard key={service.title} {...service} index={index} />)}</div>
    </section>
  )
}
