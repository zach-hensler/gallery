/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: 'https://gallery.zach-hensler.com',
  root: './',
  build: {
    outDir: 'build',
  },
  publicDir: 'public',
  test: {
    exclude: ['node_modules', 'build', '.github'],
    setupFiles: 'setupTests.ts'
  }
})
