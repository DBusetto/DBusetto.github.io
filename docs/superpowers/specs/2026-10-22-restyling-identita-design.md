# Restyling del portfolio: identità visiva "liquid glass" rosa

Data: 2026-10-22 · Branch di lavoro: `dev`

## Intento

Il portfolio (React 19 + TypeScript + Vite + SCSS Modules, pubblicato su GitHub Pages) oggi ha uno stile neutro e generico. L'obiettivo è dargli un'identità riconoscibile che rappresenti il proprietario: uno stile **semplice**, con superfici **"liquid glass"** e **gradienti rosa acceso**, nello stesso linguaggio visivo del suo progetto `C:\Users\dbusett1\dev\torneo-balilla` (che usa il viola) ma con il rosa al posto del viola.

Questo lavoro riguarda **il design generale e l'impianto**: i contenuti reali (testi, progetti, foto) li inserirà il proprietario in un secondo momento, pagina per pagina. I contenuti restano segnaposto plausibili.

## Obiettivi

1. Nuova identità visiva: fondo scuro con aloni rosa contenuti, superfici in vetro, gradiente rosa sugli elementi chiave.
2. Barra di navigazione **laterale, fissa, flottante** in vetro su desktop; barra in vetro **in basso** su telefono.
3. La home resta una pagina unica con ancore per ogni sezione (Home/hero, Chi sono, Competenze, Progetti, Contatti), con la voce attiva evidenziata durante lo scorrimento.
4. **Una pagina dedicata per ogni progetto**, raggiungibile da una card della sezione Progetti.
5. **Icone** (loghi ufficiali a colori) per ogni competenza tecnica, con alcune di esempio.

## Non-obiettivi

- Scrivere i contenuti reali (bio, testi dei progetti, immagini).
- Tema chiaro o interruttore chiaro/scuro: il sito è **solo scuro**.
- Nuove sezioni oltre a quelle esistenti.
- Blog, CMS, internazionalizzazione, analytics.

## Anti-obiettivi (sarebbe un fallimento anche se "funziona")

- Aloni rosa invadenti che riempiono il fondo: il proprietario ha chiesto esplicitamente aloni **meno marcati e meno estesi** del primo mockup. Il rosa è un accento, non lo sfondo.
- Uno stile carico o "effettoso": deve restare semplice.
- Testo poco leggibile sopra vetro o aloni.
- Link diretti alle pagine progetto che danno 404 su GitHub Pages.

## Riferimento visivo

Mockup approvati (server di brainstorming, cartella `.superpowers/brainstorm/324-1792658188/content/`):

- `direzione-v2.html`: **home desktop di riferimento** (variante A con aloni ridotti).
- `pagina-progetto.html`: **struttura della pagina progetto**.

Da `torneo-balilla` (`src/styles/tokens.css`, `src/styles/base.css`, `src/styles/components.css`) si riprende il linguaggio: aloni fissi su `body::before/::after`, vetro con "filo di luce" in alto (`inset 0 1px 0 rgba(255,255,255,…)`), fallback quasi opaco senza `backdrop-filter`, colori come custom properties, font Inter Variable.

## Decisioni del proprietario

- **Direzione A**: fondo quasi nero, barra laterale in vetro **staccata dai bordi** con angoli arrotondati (non a tutta altezza), nome in alto, voci al centro, link social in fondo.
- **Aloni rosa più contenuti** rispetto alla prima proposta: quelli di `direzione-v2.html` (alone principale in alto a sinistra, uno più tenue in basso a destra).
- **Rosa acceso** come colore identitario; gradienti rosa (non viola).
- **Solo tema scuro.**
- **Su telefono** la barra laterale diventa una barra in vetro in basso.
- La voce della barra si accende in automatico quando la sua sezione è in vista.
- **Icone a loghi ufficiali** per le competenze tecniche; esempi almeno: JavaScript, TypeScript, React, C#, Python, SQL.
- Sezioni della home: invariate (Hero, Chi sono, Competenze, Progetti, Contatti).
- **Pagina progetto** con questa struttura (va bene come base, sarà rifinita in seguito):
  1. "← Tutti i progetti"
  2. Intestazione: titolo (con gradiente), frase di sintesi, chip delle tecnologie, pulsanti "Demo live" (primario) e "Codice su GitHub" (secondario), ciascuno solo se il link esiste
  3. Copertina
  4. Scheda rapida: Ruolo, Periodo, Stato
  5. Testi: Obiettivo, Come l'ho realizzato, Sfide e soluzioni
  6. Galleria di screenshot
  7. Progetto precedente / successivo
  Nella pagina progetto la barra laterale resta, con "Progetti" attiva.

## Decisioni prese dall'assistente (approvate in blocco dal proprietario)

- **Routing**: `react-router` (v7, `BrowserRouter`) con URL puliti `/progetti/:slug`. Non `HashRouter`, che entrerebbe in conflitto con le ancore delle sezioni.
- **GitHub Pages e 404**: alla build, copia di `dist/index.html` in `dist/404.html`, così un link diretto a `/progetti/x` carica l'app. Il sito è servito dalla root (`base: '/'`, repo `<utente>.github.io`).
- **Navigazione dalla pagina progetto**: le voci della barra portano alla home e scorrono alla sezione (es. `/#projects`). Serve gestire lo scroll all'ancora dopo il cambio di rotta e riportare in cima all'apertura di una pagina progetto.
- **Contenuti**: restano in `src/data/portfolio.ts` (tipi in `src/data/types.ts`). Il tipo `Project` si estende con i campi della pagina: `slug`, sintesi, copertina, ruolo, periodo, stato, i tre testi, galleria. I campi opzionali assenti nascondono il blocco corrispondente.
- **Competenze con icona**: ogni competenza diventa un oggetto con nome e icona invece di una semplice stringa.
  - Si **mantengono i gruppi** (Frontend / Backend / Strumenti) già presenti nei dati: ogni gruppo ha un titolo e sotto una griglia di tessere in vetro "logo + nome", come le tessere del mockup. Il mockup mostrava una sola riga perché era un'anteprima compatta, non una scelta di togliere i gruppi.
  - Le competenze di esempio devono avere **tutte un logo Devicon reale**: niente loghi "presi in prestito" da un'altra tecnologia (es. il logo di PostgreSQL per indicare un SQL generico). Le voci di esempio senza logo ufficiale (oggi "REST API", "SQL") si sostituiscono con tecnologie che ce l'hanno (es. Node.js, .NET, Microsoft SQL Server, Git, GitHub Actions, Vite).
  - Se in futuro il proprietario aggiunge una competenza senza logo, la tessera mostra un'icona Lucide generica (es. `Code`) al posto del logo: il campo icona è opzionale.
- **Icone**:
  - loghi tecnologie + GitHub/LinkedIn: SVG ufficiali a colori dal pacchetto npm **`devicon`**, importati come asset locali (niente CDN a runtime);
  - icone di interfaccia (voci della barra in basso su mobile, frecce, ecc.): **`lucide-react`**.
- **Font**: Inter Variable via `@fontsource-variable/inter`, servito dal bundle.
- **Accessibilità**: contrasto testo ≥ 4.5:1 anche sopra vetro e aloni; fallback quasi opaco quando `backdrop-filter` non è supportato o con `prefers-reduced-transparency: reduce`; animazioni e scroll fluido disattivati con `prefers-reduced-motion: reduce`; focus ring rosa ben visibile; `aria-current` sulla voce attiva.

## Palette e token (punto di partenza)

Valori dei mockup, da raffinare in implementazione rispettando il contrasto:

| Ruolo | Valore |
|---|---|
| Fondo | `#0b0a10` |
| Testo | `#f6f3f8` (secondario ~70–78% di opacità o grigio equivalente con contrasto ≥ 4.5:1) |
| Rosa primario | `#ff2d95` |
| Rosa chiaro | `#ff7ac6` / `#ff8fcf` |
| Gradiente primario | `linear-gradient(120deg, #ff2d95, #ff7ac6)` (nome in hero, titolo progetto) / `#ff2d95 → #ff6fb8` (pulsante) |
| Vetro | `rgba(255,255,255,0.06)`, `blur(16px) saturate(160%)`, bordo `rgba(255,255,255,0.08)`, filo di luce `inset 0 1px 0 rgba(255,255,255,0.18)` |
| Voce attiva | fondo `rgba(255,45,149,0.22)` + bordo interno `rgba(255,140,205,0.35)` |
| Chip tecnologie | fondo `rgba(255,45,149,0.14)`, testo `#ff8fcf` |
| Alone principale | radiale `rgba(255,45,149,0.34)` piccolo, in alto a sinistra |
| Alone secondario | radiale `rgba(255,122,198,0.18)` piccolo, in basso a destra |

Il testo bianco sopra il gradiente del pulsante va verificato: se non raggiunge 4.5:1 si applica un velo scuro come `--primary-scrim` di torneo-balilla.

## Vincoli

- Stack esistente: React 19, TypeScript strict, Vite 8, SCSS Modules (una cartella per componente con `.module.scss`; token e mixin in `src/styles/`, colori come custom properties in `src/styles/global.scss`). Seguire le convenzioni già presenti.
- Package manager: **pnpm**. Deploy: GitHub Actions su push a `main` (`.github/workflows/deploy.yml`).
- Verifica: `pnpm build` (include `tsc`). **Non usare Playwright** o altri controlli nel browser senza richiesta esplicita del proprietario.
- Test (decisione dell'assistente): si aggiunge **Vitest** con uno script `pnpm test`, solo per la **logica pura** estratta in funzioni senza DOM: ricerca progetto per slug (slug inesistente → nessun risultato), progetto precedente/successivo inclusi gli estremi della lista. Nessun test di componenti, nessun test nel browser. Il resto si verifica con `pnpm build`.
- Aggiungere `.superpowers/` al `.gitignore`.
- Commenti e testi dell'interfaccia in italiano.

## Lasciato a chi costruisce

- Valori esatti di spaziature, raggi e dimensioni tipografiche, purché coerenti con i mockup e con uno stile semplice.
- Breakpoint al quale la barra passa da laterale a inferiore, e quali voci/icone mostra la barra in basso.
- Organizzazione dei nuovi componenti e delle rotte (es. layout condiviso con la barra, pagina Home, pagina Progetto, pagina 404 dell'app per slug inesistenti).
- Come rendere la card progetto in home (intera card cliccabile verso la pagina dedicata) e se mantenere sulla card i link diretti a demo/codice.
- Quali competenze di esempio oltre alle sei indicate.
- Meccanismo per la voce attiva (es. `IntersectionObserver`) e per lo scroll alle ancore dopo la navigazione.
