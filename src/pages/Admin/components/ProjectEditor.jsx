import { useId, useRef, useState } from 'react'
import { Save, X } from 'lucide-react'
import { buildProjectPayload, toProjectForm } from '../projectForm.js'

const textFields = [
  { name: 'title', label: 'Название проекта', required: true },
  { name: 'image_url', label: 'URL изображения', type: 'url', placeholder: 'https://example.com/image.jpg' },
  { name: 'project_url', label: 'Ссылка на сайт', type: 'url', placeholder: 'https://example.com' },
  { name: 'github_url', label: 'Ссылка на GitHub', type: 'url', placeholder: 'https://github.com/username/project' },
  { name: 'technologies', label: 'Технологии через запятую', placeholder: 'React, JavaScript, Supabase' },
]

export default function ProjectEditor({ initialProject, onSave, onCancel, busy }) {
  const [form, setForm] = useState(() => toProjectForm(initialProject))
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const formRef = useRef(null)
  const submitLock = useRef(false)
  const formId = useId()
  const errorId = `${formId}-error`
  const disabled = busy || saving

  function updateField(name, value) {
    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'is_published' && !value ? { is_featured: false } : {}),
    }))
    setError(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (disabled || submitLock.current) return
    setError(null)

    let payload
    try {
      payload = buildProjectPayload(form)
    } catch (validationError) {
      setError({ message: validationError.message, field: validationError.field })
      formRef.current?.elements.namedItem(validationError.field)?.focus()
      return
    }

    submitLock.current = true
    setSaving(true)
    try {
      const saved = await onSave(payload)
      if (!saved) setError({ message: 'Не удалось сохранить проект. Проверьте сообщение об ошибке и попробуйте снова.' })
    } catch {
      setError({ message: 'Не удалось сохранить проект. Проверьте соединение и попробуйте снова.' })
    } finally {
      submitLock.current = false
      setSaving(false)
    }
  }

  return (
    <form className="admin-editor" onSubmit={handleSubmit} ref={formRef} noValidate aria-busy={disabled}>
      <fieldset className="admin-editor__fields" disabled={disabled}>
        <legend className="admin-editor__legend">Данные проекта</legend>
        {textFields.map(({ name, label, type = 'text', placeholder, required }) => (
          <label className="admin-editor__field" key={name} htmlFor={`${formId}-${name}`}>
            <span>{label}{required ? ' *' : ''}</span>
            <input id={`${formId}-${name}`} name={name} type={type} value={form[name]} placeholder={placeholder} required={required} aria-invalid={error?.field === name || undefined} aria-describedby={error?.field === name ? errorId : undefined} onChange={(event) => updateField(name, event.target.value)} />
          </label>
        ))}
        <label className="admin-editor__field admin-editor__field--wide" htmlFor={`${formId}-description`}>
          <span>Описание</span>
          <textarea id={`${formId}-description`} name="description" rows={5} value={form.description} onChange={(event) => updateField('description', event.target.value)} />
        </label>
        <div className="admin-editor__options">
          <label className="admin-editor__checkbox">
            <input type="checkbox" checked={form.is_published} onChange={(event) => updateField('is_published', event.target.checked)} />
            Опубликовать на сайте
          </label>
          <label className="admin-editor__checkbox">
            <input type="checkbox" checked={form.is_featured} disabled={!form.is_published || disabled} onChange={(event) => updateField('is_featured', event.target.checked)} />
            Избранный проект
          </label>
          <p className="admin-editor__hint">Избранным может быть только опубликованный проект.</p>
        </div>
      </fieldset>
      {error && <p className="admin-editor__error" id={errorId} role="alert">{error.message}</p>}
      <div className="admin-editor__actions">
        <button className="admin__button admin__button--primary" type="submit" disabled={disabled}><Save size={18} aria-hidden="true" />{saving ? 'Сохранение…' : 'Сохранить проект'}</button>
        <button className="admin__button" type="button" disabled={disabled} onClick={onCancel}><X size={18} aria-hidden="true" />Отмена</button>
      </div>
    </form>
  )
}
