export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  /** Percorso del CV, es. '/cv.pdf' (file in /public). Vuoto = pulsante nascosto. */
  cvUrl?: string
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  repo?: string
  demo?: string
}

export interface Social {
  label: string
  url: string
}
