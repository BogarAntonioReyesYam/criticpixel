import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Al usar './', la app funciona automáticamente en Vercel (raíz) 
  // y en GitHub Pages (subcarpeta) sin cambiar el código.
  base: './', 
})
