// Tutti i contenuti del sito stanno qui: modifica questo file per personalizzare il portfolio.

import * as icons from './icons'
import type { Profile, Project, SkillGroup, Social } from './types'

export const profile: Profile = {
  name: 'D. Busetto',
  role: 'Software Developer',
  tagline: 'Costruisco applicazioni web pulite, veloci e curate nei dettagli.',
  location: 'Italia',
  email: 'tua.email@example.com',
  cvUrl: '', // es. '/cv.pdf' (metti il file in /public)
}

export const about: string[] = [
  'Scrivi qui una breve presentazione: chi sei, di cosa ti occupi e cosa ti appassiona.',
  'Un secondo paragrafo può raccontare il tuo percorso, le esperienze principali o cosa stai cercando ora.',
]

export const skills: SkillGroup[] = [
  {
    group: 'Frontend',
    items: [
      { name: 'JavaScript', icon: icons.javascript },
      { name: 'TypeScript', icon: icons.typescript },
      { name: 'React', icon: icons.react },
      { name: 'HTML', icon: icons.html5 },
      { name: 'Sass', icon: icons.sass },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'C#', icon: icons.csharp },
      { name: '.NET', icon: icons.dotnetcore },
      { name: 'Node.js', icon: icons.nodejs },
      { name: 'Python', icon: icons.python },
      { name: 'SQL Server', icon: icons.microsoftsqlserver },
    ],
  },
  {
    group: 'Strumenti',
    items: [
      { name: 'Git', icon: icons.git },
      { name: 'GitHub Actions', icon: icons.githubactions },
      { name: 'Vite', icon: icons.vitejs },
    ],
  },
]

// L'ordine della lista è anche l'ordine di "progetto precedente / successivo".
export const projects: Project[] = [
  {
    slug: 'progetto-uno',
    title: 'Progetto Uno',
    summary: 'Una frase che dice cos’è il progetto e a chi serve.',
    tags: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/DBusetto27',
    demo: 'https://dbusetto27.github.io',
    cover: '/img/progetti/progetto-uno/cover.svg',
    role: 'Sviluppo full-stack',
    period: '2025 – 2026',
    status: 'In produzione',
    goal: [
      'Qual era il problema da risolvere e per chi. Racconta il contesto in poche righe.',
      'Cosa doveva ottenere il progetto per considerarsi riuscito.',
    ],
    approach: [
      'Le scelte principali: architettura, tecnologie e perché proprio quelle.',
      'Come hai organizzato il lavoro e cosa hai realizzato in prima persona.',
    ],
    challenges: [
      'Il problema più difficile che hai incontrato e come l’hai superato.',
      'Cosa faresti diversamente oggi.',
    ],
    gallery: [
      { src: '/img/progetti/progetto-uno/screen-1.svg', alt: 'Schermata principale di Progetto Uno' },
      { src: '/img/progetti/progetto-uno/screen-2.svg', alt: 'Dettaglio di una funzionalità di Progetto Uno' },
      { src: '/img/progetti/progetto-uno/screen-3.svg', alt: 'Vista mobile di Progetto Uno' },
    ],
  },
  {
    slug: 'progetto-due',
    title: 'Progetto Due',
    summary: 'Un altro progetto di cui vai fiero: racconta cosa lo rende interessante.',
    tags: ['C#', '.NET', 'SQL Server'],
    repo: 'https://github.com/DBusetto27',
    role: 'Sviluppo backend',
    period: '2024',
    goal: ['Obiettivo del progetto in un paragrafo.'],
    approach: ['Come l’hai realizzato in un paragrafo.'],
  },
  {
    // Progetto con i soli campi obbligatori: la pagina mostra solo l'intestazione.
    slug: 'progetto-tre',
    title: 'Progetto Tre',
    summary: 'Esperimento, side project o contributo open source.',
    tags: ['Python'],
  },
]

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/DBusetto27', icon: icons.github },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/', icon: icons.linkedin },
]
