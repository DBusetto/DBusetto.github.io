# DBusetto27.github.io

Portfolio personale costruito con [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev) e pubblicato su GitHub Pages.

## Sviluppo locale

```bash
pnpm install
pnpm dev         # server di sviluppo su http://localhost:5173
pnpm build       # type-check + build di produzione in /dist
pnpm preview     # anteprima della build
```

## Personalizzazione

Tutti i contenuti (nome, bio, competenze, progetti, contatti) sono in `src/data/portfolio.ts` (tipi in `src/data/types.ts`).
Gli stili sono in `src/index.css`; i componenti delle sezioni in `src/components/`.

## Deploy

Ogni push su `main` avvia il workflow `.github/workflows/deploy.yml`, che esegue la build e la pubblica su GitHub Pages.

Una tantum: su GitHub vai in **Settings → Pages → Build and deployment → Source** e seleziona **GitHub Actions**.
