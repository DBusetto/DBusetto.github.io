import type { Project } from './types'

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
