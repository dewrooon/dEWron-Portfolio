import './About.css'
import SectionHeading from '../../components/SectionHeading'

export default function About() {
  return (
    <section className="about section container" id="about">
      <SectionHeading number="01" label="ОБО МНЕ" title="Кто стоит за кодом." />
      <div className="about__layout">
        <div className="about__copy">
          <p className="about__lead">Я независимый frontend-разработчик. Работаю под именем <span>dEWron.</span></p>
          <p>Создаю сайты и интерфейсы на JavaScript и React. Забочусь о том, чтобы они хорошо выглядели на разных устройствах и были удобны в использовании.</p>
          <p>Стараюсь писать понятный код и строить проект так, чтобы его было легко развивать. Компонентный подход помогает не повторять одно и то же и поддерживать порядок в коде.</p>
          <p>Хочу создавать надёжные цифровые решения, которые помогают бизнесу справляться с реальными задачами.</p>
        </div>
        <div className="about__code" aria-label="Принципы разработки dEWron">
          <div className="about__code-bar"><span className="about__code-dots" aria-hidden="true"><i /><i /><i /></span><span>developer.js</span><span>JS</span></div>
          <pre className="about__code-content"><code><span className="about__comment">// Немного обо мне</span>{'\n'}<span className="about__keyword">const</span>{' developer = {\n  name: '}<span className="about__string">'dEWron'</span>{',\n  focus: '}<span className="about__string">'Frontend development'</span>{',\n  stack: ['}<span className="about__string">'React'</span>{', '}<span className="about__string">'JavaScript'</span>{'],\n  principles: [\n    '}<span className="about__string">'Clean code'</span>{',\n    '}<span className="about__string">'Thoughtful architecture'</span>{',\n    '}<span className="about__string">'Less, but better'</span>{'\n  ]\n};'}</code></pre>
          <div className="about__code-footer"><span aria-hidden="true">✓</span> Каждое решение должно приносить пользу.</div>
        </div>
      </div>
    </section>
  )
}
