// Tutti i contenuti del sito stanno qui: modifica questo file per personalizzare il portfolio.

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
  { group: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'REST API', 'SQL'] },
  { group: 'Strumenti', items: ['Git', 'GitHub Actions', 'Vite', 'WebStorm'] },
]

export const projects: Project[] = [
  {
    title: 'Progetto Uno',
    description: 'Breve descrizione del progetto: problema risolto, il tuo ruolo e il risultato.',
    tags: ['React', 'Vite'],
    repo: 'https://github.com/DBusetto27',
    demo: '',
  },
  {
    title: 'Progetto Due',
    description: 'Un altro progetto di cui vai fiero. Racconta cosa lo rende interessante.',
    tags: ['Node.js', 'API'],
    repo: 'https://github.com/DBusetto27',
    demo: '',
  },
  {
    title: 'Progetto Tre',
    description: 'Esperimento, side project o contributo open source.',
    tags: ['TypeScript'],
    repo: '',
    demo: '',
  },
]

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/DBusetto27' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
]
