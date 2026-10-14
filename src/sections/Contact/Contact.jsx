import './Contact.css'
export default function Contact() {
  return (
    <section className="contact section container" id="contact" aria-labelledby="contact-title">
      <div className="contact__panel">
        <div className="contact__copy">
          <p className="contact__eyebrow"><span>06</span> КОНТАКТЫ</p>
          <h2 className="contact__title" id="contact-title">Хорошие проекты<br />начинаются <span>с диалога.</span></h2>
          <p className="contact__description">Нужен современный сайт для бизнеса или качественный веб-интерфейс? Расскажите о своей задаче. Обсудим требования, функциональность и подходящее техническое решение.</p>
          <a className="contact__button" href="https://t.me/dewrooon" target="_blank" rel="noreferrer">Обсудим ваш проект <span aria-hidden="true">↗</span></a>
        </div>
        <div className="contact__links">
          <a className="contact__link" href="https://t.me/dewrooon" target="_blank" rel="noreferrer"><span className="contact__link-label">TELEGRAM</span><span className="contact__link-value">@dewrooon <span aria-hidden="true">↗</span></span></a>
          <a className="contact__link" href="mailto:mukhsimkhanovUsman@hotmail.com"><span className="contact__link-label">EMAIL</span><span className="contact__link-value contact__link-value--email">mukhsimkhanovUsman@hotmail.com <span aria-hidden="true">↗</span></span></a>
          <p className="contact__note"><span /> Открыт к обсуждению проектов</p>
        </div>
      </div>
    </section>
  )
}
