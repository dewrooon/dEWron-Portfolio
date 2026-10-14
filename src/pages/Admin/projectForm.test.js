import test from 'node:test'
import assert from 'node:assert/strict'
import { buildProjectPayload, emptyForm, toProjectForm } from './projectForm.js'

test('rejects whitespace-only titles before a database write', () => {
  assert.throws(() => buildProjectPayload({ ...emptyForm, title: '   ' }), { field: 'title' })
})

test('normalizes technologies and clears featured on drafts', () => {
  const result = buildProjectPayload({ ...emptyForm, title: ' Portfolio ', technologies: 'React, CSS, React, ', is_featured: true })
  assert.equal(result.title, 'Portfolio')
  assert.deepEqual(result.technologies, ['React', 'CSS'])
  assert.equal(result.is_featured, false)
  assert.equal(result.image_url, null)
})

test('rejects unsafe URLs for each link field', () => {
  for (const field of ['image_url', 'project_url', 'github_url']) {
    for (const value of ['javascript:alert(1)', 'data:text/html,test', 'ftp://example.com']) {
      assert.throws(() => buildProjectPayload({ ...emptyForm, title: 'Test', [field]: value }), { field })
    }
  }
})

test('preserves published featured projects and valid URLs', () => {
  const result = buildProjectPayload({ ...emptyForm, title: 'Test', is_published: true, is_featured: true, project_url: ' https://example.com ' })
  assert.equal(result.project_url, 'https://example.com')
  assert.equal(result.is_featured, true)
})

test('editing preserves technologies and does not mutate the input', () => {
  const project = { title: 'Test', technologies: ['React', 'CSS'], is_published: true, is_featured: true }
  const form = toProjectForm(project)
  assert.equal(form.technologies, 'React, CSS')
  assert.deepEqual(project.technologies, ['React', 'CSS'])
  assert.equal(toProjectForm({ technologies: 'React, CSS' }).technologies, 'React, CSS')
  assert.deepEqual(toProjectForm(null), emptyForm)
})
