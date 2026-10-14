// Only HTTP(S) URLs from project data may become links or image sources.
export function getProjectUrl(value) {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

export function normalizeProject(project) {
  return {
    title: typeof project.title === 'string' && project.title.trim() ? project.title : 'Проект',
    description: typeof project.description === 'string' ? project.description : '',
    technologies: Array.isArray(project.technologies)
      ? [...new Set(project.technologies.filter((item) => typeof item === 'string' && item.trim()))]
      : typeof project.technologies === 'string'
        ? [...new Set(project.technologies.split(',').map((item) => item.trim()).filter(Boolean))]
        : [],
    githubUrl: getProjectUrl(project.github_url),
    projectUrl: getProjectUrl(project.project_url),
    imageUrl: getProjectUrl(project.image_url),
    isFeatured: project.is_featured === true,
  }
}

export async function fetchProjects(signal) {
  // A missing configuration should affect this section, not the entire portfolio.
  const { supabase } = await import('../lib/supabase')
  const { data, error } = await supabase
    .from('projects')
    .select('title, description, image_url, project_url, github_url, technologies, is_published, is_featured, created_at')
    .eq('is_published', true)
    .order('is_featured', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false, nullsFirst: false })
    .abortSignal(signal)

  if (error) throw error
  return (data ?? []).map(normalizeProject)
}
