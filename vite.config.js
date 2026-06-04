import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // VOLVEMOS A RUTA RELATIVA: ES LA MÁS SEGURA PARA TODO
})
