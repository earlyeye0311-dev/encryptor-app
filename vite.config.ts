import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/encryptor-app/', // <-- Mahalaga ito para sa GitHub Pages
});