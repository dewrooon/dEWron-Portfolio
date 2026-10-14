import './Hero.css'
import { FiArrowUpRight, FiArrowDown, FiCode, FiCheck } from 'react-icons/fi'
import { SiReact, SiJavascript, SiVite } from 'react-icons/si'

const technologies = [
  { label: 'React', icon: SiReact },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'Vite', icon: SiVite },
  { label: 'Clean Code & БЭМ', icon: FiCode },
]

export default function Hero() {
  return (
    <section className="hero container" id="home">
      <div className="hero__main">
        <div className="hero__content">
          <div className="hero__availability"><span />Открыт к новым проектам</div>
          <p className="hero__intro">ПРИВЕТ, Я</p>
          <h1 className="hero__title">dEWron<span>.</span></h1>
          <p className="hero__role">Frontend Developer <span>/</span> <span className="hero__stack">React & JavaScript</span></p>
          <p className="hero__description">Разрабатываю современные, адаптивные веб-сайты и интерфейсы для бизнеса.</p>
          <p className="hero__detail">Чистый код, продуманная архитектура и минималистичный дизайн. Решения, которые удобно использовать, развивать и поддерживать.</p>
          <div className="hero__actions"><a className="button button--primary" href="#contact">Связаться со мной<FiArrowUpRight aria-hidden="true" /></a><a className="button hero__projects-button" href="#projects">Посмотреть проекты<FiArrowDown aria-hidden="true" /></a></div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__orbit hero__orbit--outer" /><div className="hero__orbit hero__orbit--inner" />
          <span className="hero__coordinate hero__coordinate--top">&lt;developer /&gt;</span>
          <div className="hero__editor">
            <div className="hero__editor-bar"><span className="hero__editor-dots"><i /><i /><i /></span><span>developer.js</span><FiCode /></div>
            <div className="hero__editor-body"><div className="hero__line-numbers">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10<br />11<br />12</div><pre className="hero__code"><code><span className="hero__comment">// Turning ideas into interfaces</span>{'\n'}<span className="hero__keyword">const</span>{' developer = {\n  name: '}<span className="hero__string">'dEWron'</span>{',\n  role: '}<span className="hero__string">'Frontend Developer'</span>{',\n  stack: ['}<span className="hero__string">'React'</span>{', '}<span className="hero__string">'JavaScript'</span>{'],\n  approach: '}<span className="hero__string">'Clean Code'</span>{',\n  details: '}<span className="hero__keyword">true</span>{'\n};\n\n'}<span className="hero__keyword">function</span>{' '}<span className="hero__function">buildSomethingGreat</span>{'() {\n  '}<span className="hero__keyword">return</span>{' idea + code + care;\n}'}</code></pre></div>
            <div className="hero__editor-status"><span><span className="hero__status-dot" />Все системы готовы</span><span>JavaScript · UTF-8</span></div>
          </div>
          <div className="hero__detail-badge"><span className="hero__badge-icon"><FiCheck /></span><div><strong>Внимание к деталям</strong><span>В интерфейсе и в коде.</span></div></div>
          <span className="hero__coordinate hero__coordinate--bottom">01 — IDEAS INTO REALITY</span>
        </div>
      </div>
      <div className="hero__bottom"><span className="hero__bottom-label">МОЙ РАБОЧИЙ СТЕК</span><ul className="hero__technologies">{technologies.map(({ label, icon: Icon }) => <li key={label}><Icon aria-hidden="true" />{label}</li>)}</ul><a className="hero__scroll" href="#about" aria-label="Перейти к разделу обо мне"><FiArrowDown aria-hidden="true" /></a></div>
    </section>
  )
}
