import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo "<utente>.github.io" → il sito è servito dalla root, quindi base = '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
