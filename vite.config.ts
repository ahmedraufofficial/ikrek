import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GITHUB_PAGES is set by the deploy workflow; the site lives at /ikrek/ there.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/ikrek/' : '/',
  plugins: [react(), tailwindcss()],
})
