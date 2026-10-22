import { describe, expect, test } from 'vitest'
import { findProject, getAdjacentProjects, SLUG_PATTERN } from './projects'
import { projects } from './portfolio'
import type { Project } from './types'

const a: Project = { slug: 'a', title: 'A', summary: '', tags: [] }
const b: Project = { slug: 'b', title: 'B', summary: '', tags: [] }
const c: Project = { slug: 'c', title: 'C', summary: '', tags: [] }
const list = [a, b, c]

describe('findProject', () => {
  test('trova il progetto per slug', () => {
    expect(findProject(list, 'b')).toBe(b)
  })

  test('con uno slug inesistente restituisce undefined', () => {
    expect(findProject(list, 'zzz')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  test('in mezzo alla lista restituisce precedente e successivo', () => {
    expect(getAdjacentProjects(list, 'b')).toEqual({ previous: a, next: c })
  })

  test('il primo progetto non ha precedente', () => {
    expect(getAdjacentProjects(list, 'a')).toEqual({ next: b })
  })

  test("l'ultimo progetto non ha successivo", () => {
    expect(getAdjacentProjects(list, 'c')).toEqual({ previous: b })
  })

  test('con uno slug inesistente non restituisce adiacenti', () => {
    expect(getAdjacentProjects(list, 'zzz')).toEqual({})
  })
})

test('le immagini dei progetti non stanno sotto /progetti/, che è il percorso delle pagine', () => {
  const images = projects.flatMap((p) => [p.cover, ...(p.gallery ?? []).map((g) => g.src)]).filter(Boolean)
  images.forEach((src) => expect(src).not.toMatch(/^\/progetti\//))
})

test('i progetti reali hanno slug validi e unici', () => {
  const slugs = projects.map((p) => p.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  slugs.forEach((slug) => expect(slug).toMatch(SLUG_PATTERN))
})
