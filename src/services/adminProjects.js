import { supabase } from '../lib/supabase'

export async function fetchAdminProjects(signal) {
  const { data, error } = await supabase.from('projects')
    .select('id, title, description, image_url, project_url, github_url, technologies, is_published, is_featured, created_at')
    .order('created_at', { ascending: false })
    .abortSignal(signal)
  if (error) throw error
  return data ?? []
}

async function verifyAdmin() {
  const { data, error } = await supabase.rpc('is_admin')
  if (error) throw error
  if (data !== true) throw new Error('Права администратора не подтверждены.')
}

function requireId(id) {
  if (id === undefined || id === null || id === '') {
    throw new Error('У проекта нет id. Изменение записи невозможно.')
  }
}

export async function saveAdminProject(payload, id = null) {
  await verifyAdmin()
  let query
  if (id === null) {
    query = supabase.from('projects').insert(payload)
  } else {
    requireId(id)
    query = supabase.from('projects').update(payload).eq('id', id)
  }
  // Returning one row also detects updates rejected or hidden by RLS.
  const { data, error } = await query.select('id').single()
  if (error) throw error
  return data
}

export async function deleteAdminProject(id) {
  requireId(id)
  await verifyAdmin()
  const { error } = await supabase.from('projects').delete().eq('id', id).select('id').single()
  if (error) throw error
}
