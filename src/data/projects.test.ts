import { describe, expect, test } from 'vitest'
import { findProject, getAdjacentProjects, SLUG_PATTERN, themeVariables } from './projects'
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

test('le immagini dei progetti non stanno sotto /projects/, che è il percorso delle pagine', () => {
  const images = projects.flatMap((p) => [p.icon, p.cover, ...(p.gallery ?? []).map((g) => g.src)]).filter(Boolean)
  images.forEach((src) => expect(src).not.toMatch(/^\/projects\//))
})

test('i progetti reali hanno slug validi e unici', () => {
  const slugs = projects.map((p) => p.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  slugs.forEach((slug) => expect(slug).toMatch(SLUG_PATTERN))
})

describe('themeVariables', () => {
  test("ridipinge l'accento con i colori del progetto", () => {
    const vars = themeVariables({ accent: '#a855f7', accentLight: '#c084fc', gradient: ['#7c3aed', '#a855f7'] })
    expect(vars['--pink']).toBe('#a855f7')
    expect(vars['--pink-light']).toBe('#c084fc')
    expect(vars['--chip-bg']).toBe('rgba(168, 85, 247, 0.14)')
    expect(vars['--gradient-primary']).toContain('linear-gradient(120deg, #7c3aed, #a855f7)')
  })

  test("senza glow l'alone secondario usa il colore chiaro", () => {
    const vars = themeVariables({ accent: '#a855f7', accentLight: '#c084fc', gradient: ['#7c3aed', '#a855f7'] })
    expect(vars['--glow-soft']).toBe('rgba(192, 132, 252, 0.14)')
  })
})
