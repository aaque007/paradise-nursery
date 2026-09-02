import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Set `base` to "/<your-repo-name>/" before deploying to GitHub Pages
// (project sites are served from a sub-path). Leave as "/" for local dev,
// Vercel, Netlify, or a custom domain.
export default defineConfig({
  plugins: [react()],
  base: '/paradise-nursery/',
})
