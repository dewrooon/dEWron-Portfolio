import './Services.css'
import { FiLayout, FiGrid, FiCode, FiDatabase, FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../../components/SectionHeading'

const services = [
  { title: 'Сайты-визитки', description: 'Компактные сайты, которые рассказывают о компании, её услугах и способах связи.', icon: FiLayout, tag: 'ВАША КОМПАНИЯ В СЕТИ' },
  { title: 'Корпоративные сайты', description: 'Сайты с понятной структурой и всей важной информацией о компании, продуктах и услугах.', icon: FiGrid, tag: 'САЙТ ДЛЯ ВАШЕГО БИЗНЕСА' },
  { title: 'Frontend-разработка', description: 'Создание удобных интерфейсов на JavaScript и React из компонентов, которые можно использовать повторно.', icon: FiCode, tag: 'ОТ ИДЕИ К САЙТУ' },
  { title: 'Подключение веб-сервисов', description: 'Настройка взаимодействия сайта с базами данных и облачными сервисами, например Supabase.', icon: FiDatabase, tag: 'НУЖНЫЕ ФУНКЦИИ ДЛЯ САЙТА' },
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
      <SectionHeading number="02" label="УСЛУГИ" title="Решения для ваших задач." description="Помогу создать сайт или интерфейс, который отвечает вашим целям и удобен для людей." />
      <div className="services__grid">{services.map((service, index) => <ServiceCard key={service.title} {...service} index={index} />)}</div>
    </section>
  )
}
