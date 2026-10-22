export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  /** Percorso del CV, es. '/cv.pdf' (file in /public). Vuoto = pulsante nascosto. */
  cvUrl?: string
}

export interface Skill {
  name: string
  /** URL di un logo importato da `icons.ts`. Senza logo la tessera mostra un'icona generica. */
  icon?: string
}

export interface SkillGroup {
  group: string
  items: Skill[]
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface Project {
  /** Parte finale dell'indirizzo della pagina: /progetti/<slug>. Minuscole, numeri e trattini. */
  slug: string
  title: string
  /** Una frase che dice cos'è il progetto e a chi serve. */
  summary: string
  tags: string[]
  repo?: string
  demo?: string
  /** Immagine di copertina, es. '/img/progetti/progetto-uno/cover.png' (file in /public). */
  cover?: string
  role?: string
  period?: string
  status?: string
  /** Paragrafi delle sezioni della pagina progetto: una sezione vuota non viene mostrata. */
  goal?: string[]
  approach?: string[]
  challenges?: string[]
  gallery?: GalleryImage[]
}

export interface Social {
  label: string
  url: string
  /** URL di un logo importato da `icons.ts`. */
  icon: string
}
