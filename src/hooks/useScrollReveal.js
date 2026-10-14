import { useEffect } from 'react'

const revealTargets = [
  '.section-heading',
  '.about__copy',
  '.about__code',
  '.service-card',
  '.project-card',
  '.skills__group',
  '.approach__description',
  '.principle',
  '.contact__panel',
].join(', ')

export default function useScrollReveal(containerRef, pageKey) {
  useEffect(() => {
    const container = containerRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!container || !('IntersectionObserver' in window)) return undefined

    const elements = new Set()
    let observer
    let mutationObserver

    const reset = () => {
      observer?.disconnect()
      mutationObserver?.disconnect()
      elements.forEach((element) => {
        element.removeAttribute('data-revealed')
        element.style.removeProperty('--reveal-delay')
      })
      elements.clear()
    }

    const observe = () => {
      reset()
      if (preference.matches) return

      observer = new IntersectionObserver((entries) => {
        let order = 0
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.style.setProperty('--reveal-delay', `${Math.min(order++, 3) * 65}ms`)
          entry.target.setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0.08 })

      const discoverElements = () => {
        container.querySelectorAll(revealTargets).forEach((element) => {
          if (elements.has(element)) return
          elements.add(element)
          observer.observe(element)
        })
        elements.forEach((element) => {
          if (container.contains(element)) return
          observer.unobserve(element)
          elements.delete(element)
        })
      }

      discoverElements()
      mutationObserver = new MutationObserver(discoverElements)
      mutationObserver.observe(container, { childList: true, subtree: true })
    }

    observe()
    preference.addEventListener('change', observe)
    return () => {
      reset()
      preference.removeEventListener('change', observe)
    }
  }, [containerRef, pageKey])
}
