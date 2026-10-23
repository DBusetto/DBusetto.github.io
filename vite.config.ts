import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages non conosce le rotte dell'app: per un indirizzo come /projects/x serve 404.html.
// Pubblicando una copia di index.html come 404.html, l'app si carica comunque e mostra la pagina giusta.
function githubPages404(): Plugin {
  return {
    name: 'github-pages-404',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (index?.type === 'asset') {
        this.emitFile({ type: 'asset', fileName: '404.html', source: index.source })
      }
    },
  }
}

// Repo "<utente>.github.io" → il sito è servito dalla root, quindi base = '/'
export default defineConfig({
  plugins: [react(), githubPages404()],
  base: '/',
})
