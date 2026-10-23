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

/** Colori dell'app del progetto: sostituiscono l'accento rosa nella card e in tutta la pagina del progetto. */
export interface ProjectTheme {
  /** Colore principale, in esadecimale (es. '#a855f7'). */
  accent: string
  /** Variante chiara, per testi e link sul fondo scuro (contrasto almeno 4.5:1). */
  accentLight: string
  /** Inizio e fine della sfumatura del pulsante principale. */
  gradient: [string, string]
  /** Colore dell'alone in basso a destra. Se manca si usa `accentLight`. */
  glow?: string
}

export interface Project {
  /** Parte finale dell'indirizzo della pagina: /projects/<slug>. Minuscole, numeri e trattini. */
  slug: string
  title: string
  /** Una frase che dice cos'è il progetto e a chi serve. */
  summary: string
  tags: string[]
  repo?: string
  demo?: string
  /** Icona dell'app, quadrata, es. '/img/projects/scalcia/icon.png' (file in /public). */
  icon?: string
  theme?: ProjectTheme
  /** Immagine di copertina, es. '/img/projects/progetto-uno/cover.png' (file in /public). */
  cover?: string
  role?: string
  period?: string
  status?: string
  /** Paragrafi delle sezioni della pagina progetto: una sezione vuota non viene mostrata. */
  goal?: string[]
  /** Elenco puntato delle funzionalità principali. */
  features?: string[]
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
