import { describe, expect, test } from 'vitest'
import { getScrollTarget } from './scrollTarget'

describe('getScrollTarget', () => {
  test('tornando indietro ripristina la posizione salvata', () => {
    expect(getScrollTarget('', 'POP', 1200)).toEqual({ kind: 'position', y: 1200 })
  })

  test('tornando indietro la posizione salvata vince sull’ancora', () => {
    expect(getScrollTarget('#skills', 'POP', 800)).toEqual({ kind: 'position', y: 800 })
  })

  test('una nuova navigazione con ancora scorre alla sezione', () => {
    expect(getScrollTarget('#skills', 'PUSH', 800)).toEqual({ kind: 'element', id: 'skills' })
  })

  test('una nuova navigazione senza ancora riparte dall’inizio', () => {
    expect(getScrollTarget('', 'PUSH', 800)).toEqual({ kind: 'position', y: 0 })
  })

  test('senza posizione salvata un POP con ancora scorre alla sezione', () => {
    expect(getScrollTarget('#contact', 'POP', undefined)).toEqual({ kind: 'element', id: 'contact' })
  })

  test('un’ancora malformata non lancia errori e usa il testo grezzo', () => {
    expect(getScrollTarget('#%E0', 'PUSH', undefined)).toEqual({ kind: 'element', id: '%E0' })
  })
})
