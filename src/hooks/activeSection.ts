export interface SectionPosition {
  id: string
  /** Distanza dell'inizio della sezione dal bordo alto della finestra, in px (negativa se già passata). */
  top: number
}

/** Linea di lettura: una sezione diventa attiva quando il suo inizio la supera. */
const READING_LINE = 0.3

/**
 * Sezione attiva: l'ultima, in ordine di pagina, il cui inizio ha superato la linea di lettura.
 * Funziona anche con sezioni più corte della finestra. In fondo alla pagina vince l'ultima sezione,
 * che altrimenti potrebbe non raggiungere mai la linea.
 */
export function pickActiveSection(sections: SectionPosition[], viewportHeight: number, atBottom: boolean): string | null {
  if (sections.length === 0) return null
  if (atBottom) return sections[sections.length - 1].id

  const line = viewportHeight * READING_LINE
  let active: string | null = null
  for (const section of sections) {
    if (section.top <= line) active = section.id
  }
  return active
}
