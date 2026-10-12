import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hostinger: se sube el contenido de dist/ a public_html
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
})
