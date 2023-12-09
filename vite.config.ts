import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  root: './gallery',
  build: {
    outDir: 'build',
  },
  publicDir: 'public'
})
