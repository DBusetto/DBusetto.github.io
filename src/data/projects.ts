import type { Project, ProjectTheme } from './types'

/** Formato valido di uno slug: minuscole e numeri separati da singoli trattini. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function findProject(projects: Project[], slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Progetti prima e dopo quello indicato, nell'ordine della lista (senza ricominciare dall'inizio). */
export function getAdjacentProjects(projects: Project[], slug: string): { previous?: Project; next?: Project } {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return {}

  const adjacent: { previous?: Project; next?: Project } = {}
  if (index > 0) adjacent.previous = projects[index - 1]
  if (index < projects.length - 1) adjacent.next = projects[index + 1]
  return adjacent
}

function rgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/** Custom properties che ridipingono l'accento del sito con i colori del progetto (vedi global.scss). */
export function themeVariables(theme: ProjectTheme): Record<`--${string}`, string> {
  const { accent, accentLight, gradient, glow = accentLight } = theme
  return {
    '--pink': accent,
    '--pink-light': accentLight,
    '--pink-soft': rgba(accent, 0.22),
    '--pink-edge': rgba(accentLight, 0.35),
    '--chip-bg': rgba(accent, 0.14),
    '--gradient-text': `linear-gradient(120deg, ${accent}, ${accentLight})`,
    '--gradient-primary': `linear-gradient(var(--primary-scrim), var(--primary-scrim)), linear-gradient(120deg, ${gradient[0]}, ${gradient[1]})`,
    '--shadow-primary': `0 6px 18px ${rgba(accent, 0.3)}`,
    '--glow-main': rgba(accent, 0.34),
    '--glow-soft': rgba(glow, 0.14),
    // --focus-ring è calcolato su :root: va riscritto perché segua il nuovo colore
    '--focus-ring': `0 0 0 2px var(--bg), 0 0 0 4px ${accentLight}`,
  }
}
