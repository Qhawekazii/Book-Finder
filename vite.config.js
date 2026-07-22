import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/book-finder-api-app/',
  plugins: [react()],
});