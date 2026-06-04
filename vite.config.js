import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '', // ESTO HACE QUE TODAS LAS RUTAS SEAN RELATIVAS (PORTABILIDAD TOTAL)
})
