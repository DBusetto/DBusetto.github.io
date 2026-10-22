import { describe, expect, test } from 'vitest'
import { pickActiveSection } from './activeSection'

// Posizioni (top rispetto alla finestra) con una sezione "Chi sono" corta, alta 356px
const afterClickOnAbout = [
  { id: 'top', top: -600 },
  { id: 'about', top: 0 },
  { id: 'skills', top: 356 },
  { id: 'projects', top: 1100 },
  { id: 'contact', top: 1900 },
]

describe('pickActiveSection', () => {
  test('una sezione corta portata in cima è quella attiva', () => {
    expect(pickActiveSection(afterClickOnAbout, 900, false)).toBe('about')
  })

  test('a inizio pagina è attiva la prima sezione', () => {
    const atTop = [
      { id: 'top', top: 0 },
      { id: 'about', top: 600 },
    ]
    expect(pickActiveSection(atTop, 900, false)).toBe('top')
  })

  test('una sezione diventa attiva quando il suo inizio supera il 30% della finestra', () => {
    const sections = [
      { id: 'about', top: -200 },
      { id: 'skills', top: 250 },
    ]
    expect(pickActiveSection(sections, 900, false)).toBe('skills')
  })

  test('in fondo alla pagina vince l’ultima sezione', () => {
    expect(pickActiveSection(afterClickOnAbout, 900, true)).toBe('contact')
  })

  test('senza sezioni restituisce null', () => {
    expect(pickActiveSection([], 900, false)).toBeNull()
  })
})
