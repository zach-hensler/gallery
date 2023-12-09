import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: 'https://zach-hensler.github.io/gallery',
  root: './',
  build: {
    outDir: 'build',
  },
  publicDir: 'public'
})
