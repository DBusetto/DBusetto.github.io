export type NavigationKind = 'POP' | 'PUSH' | 'REPLACE'

export type ScrollTarget = { kind: 'element'; id: string } | { kind: 'position'; y: number }

/** Id dell'elemento indicato dall'ancora; un'ancora malformata (es. "#%E0") resta com'è invece di lanciare un errore. */
function hashToId(hash: string): string {
  const raw = hash.slice(1)
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

/**
 * Dove scorrere dopo una navigazione.
 * Indietro/avanti e ricarica (POP) tornano alla posizione salvata; altrimenti l'ancora porta alla sezione,
 * e senza ancora si riparte dall'inizio della pagina.
 */
export function getScrollTarget(hash: string, navigationType: NavigationKind, savedY: number | undefined): ScrollTarget {
  if (navigationType === 'POP' && savedY !== undefined) return { kind: 'position', y: savedY }
  if (hash) return { kind: 'element', id: hashToId(hash) }
  return { kind: 'position', y: 0 }
}
