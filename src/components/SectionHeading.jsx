import './SectionHeading.css'
export default function SectionHeading({ number, label, title, description, id }) {
  return (
    <div className="section-heading">
      <p className="section-heading__eyebrow"><span>{number}</span> {label}</p>
      <h2 className="section-heading__title" id={id}>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}
