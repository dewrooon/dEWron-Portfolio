import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../components/layout.css'
import useScrollReveal from '../../hooks/useScrollReveal'
import '../../styles/motion.css'

export default function SiteLayout() {
  const { pathname, hash, key } = useLocation()
  const mainRef = useRef(null)
  useScrollReveal(mainRef, pathname)

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])

  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <Header />
      <main id="main" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
