import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const navigation = [
  ['about', 'Обо мне'],
  ['services', 'Услуги'],
  ['projects', 'Проекты'],
  ['skills', 'Технологии'],
  ['approach', 'Подход'],
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="brand" to="/#home" aria-label="dEWron — в начало" onClick={() => setIsOpen(false)}>dEWron<span>.</span></Link>
        <button className="site-header__toggle" type="button" ref={menuButton} aria-controls="primary-navigation" aria-expanded={isOpen} aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setIsOpen(!isOpen)}>
          <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
        </button>
        <nav className={`site-header__nav${isOpen ? ' site-header__nav--open' : ''}`} id="primary-navigation" aria-label="Основная навигация">
          {navigation.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={() => setIsOpen(false)}>{label}</Link>)}
          <Link className="site-header__contact" to="/#contact" onClick={() => setIsOpen(false)}>Обсудить проект <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  )
}
