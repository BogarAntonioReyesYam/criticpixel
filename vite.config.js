import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/criticpixel/', // REQUERIDO PARA REPOSITORIOS QUE NO SON .github.io PUROS
})
