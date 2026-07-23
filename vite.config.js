import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/16Book-Finder/',
  plugins: [react()],
});