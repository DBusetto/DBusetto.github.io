// Tutti i contenuti del sito stanno qui: modifica questo file per personalizzare il portfolio.

import {
  ChartColumn,
  LayoutGrid,
  ListOrdered,
  MessagesSquare,
  Network,
  QrCode,
  ShieldCheck,
  Trophy,
  UserPlus,
  Users,
  WifiOff,
  Zap,
} from 'lucide-react'
import * as icons from './icons'
import type { Profile, Project, SkillGroup, Social } from './types'

export const profile: Profile = {
  name: 'D. Busetto',
  role: 'Cloud Developer',
  tagline: 'I build clean, fast web applications, from the interface all the way to the cloud.',
  location: 'Belluno, Italy',
  email: 'bd.busetto@gmail.com',
  cvUrl: '', // es. '/cv.pdf' (metti il file in /public)
}

export const about: string[] = [
  'I’m a Cloud Developer based in Belluno, Italy. I work in the software development team of a company that designs and manufactures industrial machinery, building applications in an environment where software, connected machines and IoT meet.',
  'I started coding in high school, out of pure curiosity, thanks to friends who were studying computer science. I then earned a technical diploma in accounting with a specialisation in business information systems, which gave me a solid foundation in both economics and IT. I went on to a two-year ITS programme in Pordenone, graduating with 108/110 and the Cloud Developer qualification.',
  'I enjoy every side of programming, frontend and backend alike. Right now my strongest side is the frontend, where most of my day-to-day work happens, while I keep growing on the backend through personal projects like Scalcia.',
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
      { name: 'PostgreSQL', icon: icons.postgresql },
    ],
  },
  {
    group: 'Cloud & Tools',
    items: [
      { name: 'Azure', icon: icons.azure },
      { name: 'Docker', icon: icons.docker },
      { name: 'Git', icon: icons.git },
      { name: 'GitHub Actions', icon: icons.githubactions },
    ],
  },
]

// L'ordine della lista è anche l'ordine di "progetto precedente / successivo".
export const projects: Project[] = [
  {
    slug: 'scalcia',
    title: 'Scalcia',
    summary: 'A real-time web app to run foosball tournaments from sign-ups to the final, built to make the day easier and more fun for organisers and players alike.',
    tags: ['React', 'TypeScript', 'Firebase', 'PWA', 'Sass'],
    live: 'https://scalcia-app.web.app',
    icon: '/img/projects/scalcia/icon.png',
    // Colori dell'app: viola come identità, lime come accento
    theme: {
      accent: '#a855f7',
      accentLight: '#c084fc',
      gradient: ['#7c3aed', '#a855f7'],
      glow: '#a3e635',
    },
    role: 'Solo project · design & development',
    period: '2026 – present',
    status: 'In production',
    goal: [
      'Foosball tournaments are usually run on paper sheets and group chats: players never know when they are up next, and organisers spend the evening chasing results instead of enjoying the event.',
      'Scalcia moves the whole tournament onto the phone. Organisers set it up and run it from the venue, referees record results with a couple of taps, and every player follows groups, matches and brackets live from a link or a QR code, with nothing to download.',
    ],
    features: [
      {
        icon: Zap,
        title: 'Live everywhere',
        text: 'Every score, standing and bracket updates instantly on every phone, with no need to refresh.',
      },
      {
        icon: Trophy,
        title: 'Many tournaments',
        text: 'Live, upcoming and archived tournaments side by side, each with its own public page.',
      },
      {
        icon: UserPlus,
        title: 'Online sign-ups',
        text: 'Pairs and singles sign up from the app, with optional seat limits or a random draw of the pairs.',
      },
      {
        icon: Users,
        title: 'Teammate finder',
        text: 'Boards to find a partner for a tournament or just to play, by preferred role: attack or defence.',
      },
      {
        icon: LayoutGrid,
        title: 'Groups & standings',
        text: 'Automatic or manual groups, two match-ordering modes and head-to-head tie-breakers.',
      },
      {
        icon: Network,
        title: 'Knockout brackets',
        text: 'Byes, an optional third-place match and sub-tournaments that keep every team playing.',
      },
      {
        icon: ListOrdered,
        title: 'Smart table queue',
        text: 'As soon as a result is confirmed, the freed table goes to the next match in line.',
      },
      {
        icon: ShieldCheck,
        title: 'Staff roles',
        text: 'Master, organiser, co-organiser and referee, each signing in with Google and with just the permissions they need.',
      },
      {
        icon: ChartColumn,
        title: 'Player profiles',
        text: 'Personal stats, an all-time ranking, the tournament archive and your own team highlighted on screen.',
      },
      {
        icon: MessagesSquare,
        title: 'Messages & channels',
        text: 'Direct chats between players and announcement channels to keep followers in the loop.',
      },
      {
        icon: QrCode,
        title: 'Posters with QR code',
        text: 'Shareable posters generated in the app, in A4 for printing or Stories format for social media.',
      },
      {
        icon: WifiOff,
        title: 'Offline-ready app',
        text: 'Installable on the phone and resilient to poor Wi-Fi: offline results are sent when the connection returns.',
      },
    ],
    approach: [
      'Scalcia is a single-page app built with React, TypeScript and Vite, styled with Sass modules. Firebase handles the backend: Firestore keeps every screen in sync in real time, Authentication provides Google sign-in for staff and players (plus anonymous sessions for the public pages), and Hosting serves it as an installable PWA.',
      'The tournament logic (groups, schedules, standings, tie-breakers, brackets and sub-tournaments) lives in a pure domain layer with no UI or Firebase dependencies, covered by unit tests with Vitest. Permissions are enforced by Firestore security rules, tested against the local emulator.',
      'I designed and built it end to end on my own: product decisions, UI design, implementation and releases, with separate staging and production environments and preview channels to try changes safely before tournament day.',
    ],
    challenges: [
      'Live and offline at the same time: venues often have weak connectivity, so results entered without a network are queued and synced when it comes back, and the app keeps staff aware of being offline so no score gets lost mid-tournament.',
      'Fair rules in code: ties resolved by head-to-head results or play-offs, odd numbers of teams handled with byes, and sub-tournaments for every placing all needed careful modelling and many tests on edge cases.',
      'Security without a custom server: since the app writes straight to Firestore, every role and permission is expressed in security rules and verified with automated tests.',
      'Keeping the codebase tidy as it grew: I reorganised the project by feature area (tournaments, registration, chat, accounts). Starting with that structure from day one would have saved a large refactor later.',
    ],
  },
]

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/DBusetto27', icon: icons.github },
]
