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
    assetsInlineLimit: 0, // Ensure all assets are emitted as files
    rollupOptions: {
      output: {
        // Keep the original file names for font assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (['woff2', 'woff', 'ttf', 'eot'].includes(ext)) {
            return `assets/[name][extname]`; // Keep original filename for fonts
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  // Ensure WOFF2 files are treated as assets and copied to the output directory
  assetsInclude: ['**/*.woff2'],
  publicDir: 'public',
  copyPublicDir: true,
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
