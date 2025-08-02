import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { generateOgImages } from './vite-plugin-og-images.js';

export default defineConfig({
  plugins: [
    vue(),
    generateOgImages()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000
  }
});
