import './About.css'
import SectionHeading from '../../components/SectionHeading'

export default function About() {
  return (
    <section className="about section container" id="about">
      <SectionHeading number="01" label="ЗНАКОМСТВО" title="Разработчик за кодом." />
      <div className="about__layout">
        <div className="about__copy">
          <p className="about__lead">Я независимый frontend-разработчик, развивающий собственный бренд <span>dEWron.</span></p>
          <p>Специализируюсь на создании веб-интерфейсов с использованием JavaScript и React. Особое внимание уделяю структуре проекта, качеству кода, адаптивности и удобству взаимодействия.</p>
          <p>В разработке придерживаюсь принципов Clean Code, использую компонентный подход и заранее подготовленные архитектурные шаблоны. Это помогает поддерживать единый стандарт качества и сокращать время на повторяющиеся задачи.</p>
          <p>Моя цель — создавать понятные, функциональные и надёжные цифровые решения, которые решают реальные задачи бизнеса.</p>
        </div>
        <div className="about__code" aria-label="Принципы разработки dEWron">
          <div className="about__code-bar"><span className="about__code-dots" aria-hidden="true"><i /><i /><i /></span><span>developer.js</span><span>JS</span></div>
          <pre className="about__code-content"><code><span className="about__comment">// Немного обо мне</span>{'\n'}<span className="about__keyword">const</span>{' developer = {\n  name: '}<span className="about__string">'dEWron'</span>{',\n  focus: '}<span className="about__string">'Frontend development'</span>{',\n  stack: ['}<span className="about__string">'React'</span>{', '}<span className="about__string">'JavaScript'</span>{'],\n  principles: [\n    '}<span className="about__string">'Clean code'</span>{',\n    '}<span className="about__string">'Thoughtful architecture'</span>{',\n    '}<span className="about__string">'Less, but better'</span>{'\n  ]\n};'}</code></pre>
          <div className="about__code-footer"><span aria-hidden="true">✓</span> У каждого решения есть назначение.</div>
        </div>
      </div>
    </section>
  )
}
