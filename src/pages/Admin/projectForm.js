export const emptyForm = Object.freeze({
  title: '',
  description: '',
  image_url: '',
  project_url: '',
  github_url: '',
  technologies: '',
  is_published: false,
  is_featured: false,
})

export function toProjectForm(project) {
  if (!project) return { ...emptyForm }

  return {
    title: project.title ?? '',
    description: project.description ?? '',
    image_url: project.image_url ?? '',
    project_url: project.project_url ?? '',
    github_url: project.github_url ?? '',
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(', ')
      : typeof project.technologies === 'string' ? project.technologies : '',
    is_published: Boolean(project.is_published),
    is_featured: Boolean(project.is_published && project.is_featured),
  }
}

function validateUrl(value, label, field) {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const url = new URL(trimmed)
    if (url.protocol === 'https:' || url.protocol === 'http:') return trimmed
  } catch {
    // Use the same actionable message for malformed and unsupported URLs.
  }

  const error = new Error(`${label}: укажите полный адрес, начинающийся с https:// или http://.`)
  error.field = field
  throw error
}

export function buildProjectPayload(form) {
  const title = form.title.trim()
  if (!title) {
    const error = new Error('Введите название проекта.')
    error.field = 'title'
    throw error
  }

  return {
    title,
    description: form.description.trim(),
    image_url: validateUrl(form.image_url, 'Изображение', 'image_url'),
    project_url: validateUrl(form.project_url, 'Ссылка на сайт', 'project_url'),
    github_url: validateUrl(form.github_url, 'Ссылка на GitHub', 'github_url'),
    technologies: [...new Set(form.technologies.split(',').map((item) => item.trim()).filter(Boolean))],
    is_published: Boolean(form.is_published),
    is_featured: Boolean(form.is_published && form.is_featured),
  }
}
