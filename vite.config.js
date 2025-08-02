import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { generateOgImages } from './vite-plugin-og-images.js'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    generateOgImages({
      outputDir: 'docs/og-images',
      basePath: '/',
      siteUrl: 'https://mediumtalk.org'
    })
  ],
  base: '/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: false, // Prevent Vite from emptying the output directory
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
