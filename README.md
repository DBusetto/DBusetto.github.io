# DBusetto27.github.io

Portfolio personale costruito con [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev) e pubblicato su GitHub Pages.

## Sviluppo locale

```bash
pnpm install
pnpm dev         # server di sviluppo su http://localhost:5173
pnpm build       # type-check + build di produzione in /dist
pnpm preview     # anteprima della build
pnpm test        # test della logica (Vitest)
```

## Personalizzazione

Tutti i contenuti (nome, bio, competenze, progetti, contatti) sono in `src/data/portfolio.ts` (tipi in `src/data/types.ts`).

**Aggiungere un progetto.** Aggiungi un oggetto alla lista `projects`. Sono obbligatori `slug`, `title`, `summary` e `tags`. Lo `slug` diventa l'indirizzo della pagina (`/projects/<slug>`): deve essere unico e fatto solo di minuscole, numeri e trattini (lo controlla `pnpm test`). Gli altri campi (`live` per un prodotto in uso online, che si apre dal titolo della pagina, `demo` per una versione dimostrativa, icona, colori, copertina, ruolo, periodo, stato, testi, funzionalità, galleria) sono facoltativi: se mancano, il blocco corrispondente non compare. Le immagini vanno in `public/img/projects/<slug>/` (non in `public/projects/`, che è il percorso delle pagine). Con `theme` la card e la pagina del progetto prendono i colori della sua app al posto del rosa. L'ordine della lista è anche quello di "progetto precedente / successivo".

**Aggiungere una competenza.** Aggiungi `{ name, icon }` al gruppo giusto in `skills`. I loghi vengono da [Devicon](https://devicon.dev): se quello che ti serve non c'è ancora, aggiungi una riga in `src/data/icons.ts` che punti a `devicon/icons/<nome>/<nome>-original.svg`. Senza `icon` la tessera mostra un'icona generica.

**Stile.** Colori, vetro e aloni sono custom properties in `src/styles/global.scss`; token (breakpoint, raggi, misure della barra) e mixin (`glass`, `focus-ring`, ...) sono in `src/styles/`. Ogni componente ha la sua cartella in `src/components/` (le pagine in `src/pages/`) con il proprio `.module.scss`.

## Deploy

Ogni push su `main` avvia il workflow `.github/workflows/deploy.yml`, che esegue test e build e pubblica il risultato su GitHub Pages. La build copia `index.html` in `404.html`, così anche i link diretti alle pagine dei progetti funzionano.

Una tantum: su GitHub vai in **Settings → Pages → Build and deployment → Source** e seleziona **GitHub Actions**.
