# Restyling identità "liquid glass" rosa: piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dare al portfolio la nuova identità (fondo scuro, aloni rosa contenuti, vetro, gradienti rosa, barra laterale fissa, icone delle competenze) e aggiungere una pagina dedicata per ogni progetto.

**Architecture:** Si aggiunge React Router (`BrowserRouter`) con un layout condiviso (barra laterale/inferiore + contenuto + footer) e tre rotte: home a sezioni, `/progetti/:slug`, 404 dell'app. I dati restano in `src/data/portfolio.ts`; la logica pura sui progetti sta in `src/data/projects.ts` ed è coperta da Vitest. Lo stile segue gli SCSS Modules esistenti, con token colore come custom properties in `global.scss` e un mixin `glass` condiviso.

**Tech Stack:** React 19, TypeScript strict, Vite 8, SCSS Modules (sass-embedded), react-router 8 (API dichiarativa), lucide-react, devicon (SVG), @fontsource-variable/inter, Vitest 5. Package manager pnpm.

**Spec:** `docs/superpowers/specs/2026-10-22-restyling-identita-design.md`

## Global Constraints

- Solo tema scuro: niente `prefers-color-scheme: light`, niente interruttore.
- Colori di partenza: fondo `#0b0a10`, testo `#f6f3f8`, rosa `#ff2d95`, rosa chiaro `#ff7ac6` / `#ff8fcf`, gradiente `linear-gradient(120deg, #ff2d95, #ff7ac6)`.
- Vetro: `rgba(255,255,255,0.06)`, `blur(16px) saturate(160%)`, bordo `rgba(255,255,255,0.08)`, filo di luce `inset 0 1px 0 rgba(255,255,255,0.18)`.
- Aloni contenuti (come `direzione-v2.html`): principale radiale `rgba(255,45,149,0.34)` piccolo in alto a sinistra, secondario `rgba(255,122,198,0.18)` piccolo in basso a destra. Il rosa è un accento, non lo sfondo.
- Contrasto testo ≥ 4.5:1 ovunque, incluso testo bianco sul pulsante a gradiente (velo scuro `rgba(0,0,0,0.3)` sopra il gradiente).
- Fallback quasi opaco del vetro con `@supports not (backdrop-filter: blur(1px))` e con `prefers-reduced-transparency: reduce`.
- `prefers-reduced-motion: reduce` disattiva transizioni e scroll fluido.
- Focus ring rosa visibile su tutti gli elementi interattivi; `aria-current` sulla voce attiva della barra.
- Loghi delle tecnologie e di GitHub/LinkedIn: SVG dal pacchetto `devicon`, importati come asset locali (niente CDN). Icone d'interfaccia: `lucide-react`.
- Font: Inter Variable (`@fontsource-variable/inter`).
- Commenti e testi dell'interfaccia in italiano.
- Verifica: `pnpm build` e `pnpm test`. **Niente Playwright o controlli nel browser.**
- **Nessun commit**: il proprietario ha chiesto di aspettare il suo via libera. Ogni task termina con la verifica, non con un commit.

## Review Focus

1. Apertura diretta o ricarica di `/progetti/<slug>` su GitHub Pages: deve caricare l'app, non il 404 di GitHub → `dist/404.html` identico a `dist/index.html` (verifica nel Task 3).
2. Slug inesistente: pagina "Progetto non trovato" con link alla home, non una pagina vuota → `findProject` restituisce `undefined` (test nel Task 2) e la pagina progetto lo gestisce (Task 7).
3. Slug duplicati o non validi nei dati inseriti dal proprietario: due progetti con lo stesso indirizzo → test sui dati reali (Task 2).
4. Dalla pagina progetto, clic su una voce della barra: si torna alla home **e** si scorre alla sezione; aprendo un progetto si parte dall'inizio della pagina → `ScrollManager` (Task 3).
5. Progetto con i soli campi obbligatori (niente copertina, scheda, testi, galleria): la pagina non mostra titoli vuoti → i dati d'esempio includono un progetto minimo (Task 2) e la pagina nasconde i blocchi vuoti (Task 7).

---

### Task 1: Fondamenta del tema scuro rosa

**Files:**
- Modify: `package.json` (dipendenze)
- Modify: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/global.scss`
- Modify: `src/main.tsx` (import del font)

**Interfaces:**
- Produces:
  - custom properties in `:root`: `--bg`, `--text`, `--text-muted`, `--pink`, `--pink-light`, `--pink-soft` (fondo chip/voce attiva), `--gradient-text`, `--gradient-primary` (con velo scuro), `--glass-bg`, `--glass-border`, `--glass-rim`, `--glass-shadow`, `--glass-fallback`, `--focus-ring`, `--font-sans`;
  - token SCSS `$sidebar-width: 200px`, `$sidebar-inset: 16px`, `$bottom-bar-height: 64px`, breakpoint `md: 900px` (sotto: barra in basso);
  - mixin `glass($fallback: var(--glass-fallback))`: sfondo, `backdrop-filter`, bordo, filo di luce, ombra e i due fallback dei Global Constraints;
  - mixin `focus-ring`: applica `--focus-ring` su `:focus-visible`.

- [ ] **Step 1: Installare le dipendenze**

Run: `pnpm add react-router lucide-react devicon @fontsource-variable/inter` e `pnpm add -D vitest`
Expected: `package.json` le elenca; nessun errore.

- [ ] **Step 2: Riscrivere `global.scss`**

Token colore dei Global Constraints (`--text-muted: #a9a3b5`), nessun blocco chiaro, `color-scheme: dark`, `font-family: var(--font-sans)`. Aloni fissi su `body::before` / `body::after` (`position: fixed; inset: 0; z-index: -1; pointer-events: none`), dimensioni contenute come da `direzione-v2.html`. `scroll-behavior: smooth` solo dentro `@media (prefers-reduced-motion: no-preference)`; in `reduce` anche `transition: none` globale. Link in `--pink-light`. `scroll-padding-top` non serve più (niente barra in alto): rimuoverlo.

- [ ] **Step 3: Aggiornare token e mixin**

In `_tokens.scss` rimuovere `$nav-height`, aggiungere i token sopra. In `_mixins.scss` aggiungere `glass` e `focus-ring`. `lift` resta, con il bordo in `--pink`.

- [ ] **Step 4: Font**

In `src/main.tsx` aggiungere `import '@fontsource-variable/inter'` prima di `./styles/global.scss`; `--font-sans: 'Inter Variable', system-ui, -apple-system, 'Segoe UI', sans-serif`.

- [ ] **Step 5: Verifica**

Run: `pnpm build`
Expected: build riuscita. I moduli che usano ancora `$nav-height` (Navbar) falliranno: in tal caso sostituire provvisoriamente con `64px` nel solo `Navbar.module.scss`, che il Task 4 elimina.

---

### Task 2: Modello dati e logica dei progetti (TDD)

**Files:**
- Modify: `src/data/types.ts`, `src/data/portfolio.ts`
- Create: `src/data/icons.ts`, `src/data/projects.ts`, `src/data/projects.test.ts`
- Modify: `package.json` (script `"test": "vitest run"`)

**Interfaces:**
- Produces (in `types.ts`):
  ```ts
  export interface Skill { name: string; icon?: string }          // icon = URL di un SVG importato
  export interface SkillGroup { group: string; items: Skill[] }
  export interface GalleryImage { src: string; alt: string }
  export interface Project {
    slug: string; title: string; summary: string; tags: string[]
    repo?: string; demo?: string; cover?: string
    role?: string; period?: string; status?: string
    goal?: string[]; approach?: string[]; challenges?: string[]   // paragrafi
    gallery?: GalleryImage[]
  }
  export interface Social { label: string; url: string; icon: string }
  ```
  (`Project.description` diventa `summary`.)
- Produces (in `projects.ts`):
  - `findProject(projects: Project[], slug: string): Project | undefined`
  - `getAdjacentProjects(projects: Project[], slug: string): { previous?: Project; next?: Project }`: nessun giro circolare; slug inesistente → `{}`.
  - `SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/`
- Produces (in `icons.ts`): un'esportazione nominata per ogni logo, es. `export { default as javascript } from 'devicon/icons/javascript/javascript-original.svg'`. Loghi: javascript, typescript, react, html5, sass, nodejs, csharp, dotnetcore, python, microsoftsqlserver, git, githubactions, vitejs (tutti `-original.svg`), github (`github-original.svg`), linkedin (`linkedin-plain.svg`).

- [ ] **Step 1: Scrivere i test che falliscono** in `src/data/projects.test.ts`

```ts
const a = { slug: 'a', title: 'A', summary: '', tags: [] }
const b = { slug: 'b', title: 'B', summary: '', tags: [] }
const c = { slug: 'c', title: 'C', summary: '', tags: [] }
const list = [a, b, c]

test('findProject trova per slug', () => expect(findProject(list, 'b')).toBe(b))
test('findProject con slug inesistente restituisce undefined', () => expect(findProject(list, 'zzz')).toBeUndefined())
test('adiacenti in mezzo', () => expect(getAdjacentProjects(list, 'b')).toEqual({ previous: a, next: c }))
test('primo progetto: nessun precedente', () => expect(getAdjacentProjects(list, 'a')).toEqual({ next: b }))
test('ultimo progetto: nessun successivo', () => expect(getAdjacentProjects(list, 'c')).toEqual({ previous: b }))
test('slug inesistente: nessun adiacente', () => expect(getAdjacentProjects(list, 'zzz')).toEqual({}))
test('i progetti reali hanno slug validi e unici', () => {
  const slugs = projects.map((p) => p.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  slugs.forEach((s) => expect(s).toMatch(SLUG_PATTERN))
})
```
(`projects` importato da `./portfolio`.)

- [ ] **Step 2: Eseguire i test e vederli fallire**

Run: `pnpm test`
Expected: FAIL, modulo `./projects` inesistente.

- [ ] **Step 3: Implementare `projects.ts`, aggiornare `types.ts`, creare `icons.ts` e aggiornare `portfolio.ts`**

Dati d'esempio in `portfolio.ts`:
- `skills`: Frontend → JavaScript, TypeScript, React, HTML, Sass; Backend → C#, .NET, Node.js, Python, SQL Server; Strumenti → Git, GitHub Actions, Vite. Tutti con icona. Niente "REST API" né "SQL" generico.
- `projects`:
  - `progetto-uno`: tutti i campi compilati, con testi segnaposto (2 paragrafi per obiettivo, realizzazione e sfide), `cover` e 3 immagini di galleria come SVG segnaposto in `public/progetti/` (rettangoli scuri con testo, creati in questo step);
  - `progetto-due`: compilato a metà, senza galleria;
  - `progetto-tre`: solo i campi obbligatori (copre il punto 5 della Review Focus).
- `socials`: GitHub e LinkedIn con le icone di `icons.ts`.

- [ ] **Step 4: Eseguire i test**

Run: `pnpm test`
Expected: 7 test PASS.

- [ ] **Step 5: Verifica dei tipi**

Run: `pnpm build`
Expected: fallisce solo dove i componenti usano ancora `description` o le skill come stringhe (`Projects.tsx`, `Skills.tsx`). Adattarli in modo minimo (`summary`, `item.name`) finché i Task 5 e 6 non li riscrivono; poi la build passa.

---

### Task 3: Routing, layout condiviso e 404 per GitHub Pages

**Files:**
- Modify: `src/App.tsx`, `vite.config.ts`
- Create: `src/pages/HomePage.tsx`, `src/pages/NotFoundPage/NotFoundPage.tsx` + `.module.scss`
- Create: `src/components/Layout/Layout.tsx` + `.module.scss`
- Create: `src/components/ScrollManager/ScrollManager.tsx`
- Create: `src/pages/ProjectPage/ProjectPage.tsx` (provvisoria: solo titolo; completata nel Task 7)

**Interfaces:**
- Consumes: `findProject` (Task 2).
- Produces:
  - rotte: `/` → `HomePage`, `/progetti/:slug` → `ProjectPage`, `*` → `NotFoundPage`, tutte figlie di `Layout` tramite `<Outlet />`;
  - `Layout`: contenitore con spazio a sinistra per la barra (`$sidebar-width + 2 * $sidebar-inset`) sopra `md`, spazio in basso per la barra sotto `md`; contiene `<Sidebar />` (Task 4; fino ad allora la `Navbar` attuale), `<main>`, `<Footer />`, `<ScrollManager />`;
  - `ScrollManager`: a ogni cambio di `location.key`, se c'è `location.hash` scorre all'elemento con quell'id, altrimenti `window.scrollTo(0, 0)`. Usa `behavior: 'auto'` con `prefers-reduced-motion: reduce`.
  - `HomePage`: Hero, About, Skills, Projects, Contact (il contenuto attuale di `App`).

- [ ] **Step 1: Plugin per il 404 in `vite.config.ts`**

Plugin inline `githubPages404()` con `apply: 'build'`, `enforce: 'post'` e un hook `generateBundle(_, bundle)` che, se `bundle['index.html']` è un asset, chiama `this.emitFile({ type: 'asset', fileName: '404.html', source })` con lo stesso contenuto. Non servono `fs` né `@types/node`.

- [ ] **Step 2: Rotte, layout, ScrollManager, HomePage e NotFoundPage**

`NotFoundPage`: titolo "Pagina non trovata", una frase e un link alla home in stile pulsante primario.

- [ ] **Step 3: Verifica**

Run: `pnpm build`, poi `cmp dist/index.html dist/404.html && echo IDENTICI`
Expected: build riuscita, output `IDENTICI`.

Run: `pnpm test`
Expected: PASS.

---

### Task 4: Barra laterale in vetro e barra inferiore su mobile

**Files:**
- Create: `src/components/Sidebar/Sidebar.tsx`, `Sidebar.module.scss`, `navItems.ts`
- Create: `src/hooks/useActiveSection.ts`
- Delete: `src/components/Navbar/` (cartella intera)
- Modify: `src/components/Layout/Layout.tsx` (usa `Sidebar`)

**Interfaces:**
- Consumes: `profile`, `socials` (Task 2); mixin `glass`, `focus-ring` (Task 1).
- Produces:
  - `navItems: { id: 'top' | 'about' | 'skills' | 'projects' | 'contact'; label: string; icon: LucideIcon }[]` con le etichette Home, Chi sono, Competenze, Progetti, Contatti e le icone Lucide `House`, `User`, `Code`, `FolderOpen`, `Mail`;
  - `useActiveSection(ids: readonly string[], enabled: boolean): string | null`: `IntersectionObserver` sulle sezioni; attiva quella più in alto tra quelle visibili (rootMargin indicativo `-40% 0px -55% 0px`); restituisce `null` se `enabled` è falso.

- [ ] **Step 1: Hook `useActiveSection`**
- [ ] **Step 2: `Sidebar`**

Sopra `md`: pannello `glass` fisso, staccato dai bordi di `$sidebar-inset`, raggio 20px, larghezza `$sidebar-width`, alto quanto la finestra meno gli inset. Contiene il nome in alto (`Link` a `/#top`), le voci al centro (`Link` a `/#<id>`) e i social in fondo (logo devicon e testo nascosto per gli screen reader). Voce attiva: fondo `--pink-soft`, bordo interno `rgba(255,140,205,0.35)`, `aria-current="true"`. Sulla rotta `/progetti/*` la voce attiva è sempre `projects`; nella 404 nessuna.

Sotto `md`: barra `glass` fissa in basso, staccata dai bordi, alta `$bottom-bar-height`, con le 5 voci in icona più etichetta piccola. Nome e social non compaiono (i social restano nella sezione Contatti).

- [ ] **Step 3: Rimuovere `Navbar` e collegare `Sidebar` nel `Layout`**
- [ ] **Step 4: Verifica**

Run: `pnpm build && pnpm test`
Expected: entrambi PASS; `grep -r "Navbar" src` non restituisce nulla.

---

### Task 5: Competenze con loghi

**Files:**
- Modify: `src/components/Skills/Skills.tsx`, `Skills.module.scss`

**Interfaces:**
- Consumes: `skills: SkillGroup[]` con `Skill.icon?` (Task 2); mixin `glass`, `auto-grid`.

- [ ] **Step 1: Riscrivere `Skills`**

Per ogni gruppo: titolo `h3`, poi una griglia (`auto-grid(110px, 0.75rem)`) di tessere `glass` con raggio 14px, con il logo 36×36 (`<img src alt="" />`, decorativo perché il nome è scritto sotto) e il nome. Se `icon` manca, si usa l'icona Lucide `Code` con la stessa dimensione e colore `--pink-light`. All'hover la tessera si solleva con il mixin `lift`.

- [ ] **Step 2: Verifica**

Run: `pnpm build`
Expected: PASS; in `dist/assets` sono presenti gli SVG dei loghi.

---

### Task 6: Restyling di home e componenti condivisi

**Files:**
- Modify: `Hero`, `About`, `Projects`, `Contact`, `Footer`, `Section`, `Card`, `TagList`, `ButtonLink` (`.tsx` e `.module.scss`)

**Interfaces:**
- Consumes: `projects` (Task 2), mixin `glass`, `lift`, `focus-ring`.
- Produces: `ButtonLink` invariato nelle props (`variant: 'primary' | 'secondary'`); `Card` invariata nelle props ma con stile `glass`; `Section` **senza** la prop `alt`, che non serve più su fondo unico.

- [ ] **Step 1: Componenti condivisi**
  - `ButtonLink`: primary con `--gradient-primary`, testo bianco, ombra rosa tenue; secondary `glass` con testo `--text`; `focus-ring`.
  - `Card`: `glass`, raggio 18px.
  - `TagList`: chip con fondo `rgba(255,45,149,0.14)` e testo `#ff8fcf`.
  - `Section`: titolo `h2` in `--text`, nessuna alternanza di fondo.
- [ ] **Step 2: Sezioni**
  - `Hero`: nome con `--gradient-text` (`background-clip: text`), "Ciao, sono" in maiuscoletto con spaziatura, ruolo e tagline in `--text-muted`.
  - `Projects`: ogni card è un `Link` a `/progetti/<slug>` (intera card cliccabile, `Card interactive`) con titolo, `summary`, tag e "Scopri il progetto →". Niente link a demo o codice sulla card, perché non si possono annidare link.
  - `Contact` e `Footer` in stile coerente; il footer sta nella colonna del contenuto, non sotto la barra.
- [ ] **Step 3: Verifica**

Run: `pnpm build && pnpm test`
Expected: PASS; `grep -rn "alt\b" src/components/Section` non trova la prop.

---

### Task 7: Pagina progetto completa

**Files:**
- Modify: `src/pages/ProjectPage/ProjectPage.tsx`
- Create: `src/pages/ProjectPage/ProjectPage.module.scss`

**Interfaces:**
- Consumes: `findProject`, `getAdjacentProjects`, `projects` (Task 2); `ButtonLink`, `TagList`, `Card` (Task 6); `useParams` di react-router.

- [ ] **Step 1: Implementare la pagina**

Blocchi in ordine, come da spec e `pagina-progetto.html`:
1. `Link` "← Tutti i progetti" verso `/#projects`.
2. Intestazione: `h1` con gradiente, `summary`, `TagList` dei tag, pulsante "Demo live" (primary) se c'è `demo`, "Codice su GitHub" (secondary) se c'è `repo`; entrambi i link esterni con `target="_blank" rel="noreferrer"`.
3. Copertina (`img` con `alt` = titolo) se c'è `cover`.
4. Scheda rapida a 3 colonne (`Card`) con Ruolo, Periodo e Stato: mostra solo le voci presenti, e nessuna scheda se mancano tutte.
5. Le sezioni "Obiettivo", "Come l'ho realizzato" e "Sfide e soluzioni" compaiono solo se il rispettivo array non è vuoto.
6. Galleria in griglia se `gallery` non è vuota.
7. Navigazione precedente/successivo con `getAdjacentProjects`; i lati senza progetto restano vuoti.

Se `findProject` restituisce `undefined`: titolo "Progetto non trovato", una frase e un link "← Tutti i progetti". Il titolo del documento (`document.title`) diventa "<titolo progetto> — <nome>" e si ripristina all'uscita dalla pagina.

- [ ] **Step 2: Verifica**

Run: `pnpm build && pnpm test`
Expected: PASS.

---

### Task 8: Rifinitura e documentazione

**Files:**
- Modify: `README.md`, `index.html`, `public/favicon.svg`

- [ ] **Step 1: README**

Aggiornare la sezione "Personalizzazione": come aggiungere un progetto (campi e slug), come aggiungere una competenza con un logo da `src/data/icons.ts`, dove sono i token di colore. Aggiungere `pnpm test` ai comandi.
- [ ] **Step 2: Meta e favicon**

`<meta name="theme-color" content="#0b0a10">`; favicon con il gradiente rosa al posto dell'indaco.
- [ ] **Step 3: Verifica finale**

Run: `pnpm build && pnpm test && cmp dist/index.html dist/404.html && echo OK`
Expected: tutto PASS e `OK`. Poi `rm -rf dist`. Nessun commit.
