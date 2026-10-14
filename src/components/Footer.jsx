import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="site-footer container">
      <Link className="brand" to="/#home" aria-label="dEWron — в начало">dEWron<span>.</span></Link>
      <p className="site-footer__copyright">© {new Date().getFullYear()} dEWron</p>
      <Link className="site-footer__top" to="/#home">Наверх <span aria-hidden="true">↑</span></Link>
    </footer>
  )
}
