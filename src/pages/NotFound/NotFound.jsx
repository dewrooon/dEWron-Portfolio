import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found container" aria-labelledby="not-found-title">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title" id="not-found-title">Страница не найдена</h1>
      <p className="not-found__description">Такой страницы нет. Проверьте адрес или перейдите на главную страницу.</p>
      <Link className="button button--primary" to="/">На главную страницу</Link>
    </section>
  )
}
