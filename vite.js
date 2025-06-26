import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rtc-openapi/', // match GitHub repo path if using GitHub Pages
  plugins: [react()],
});
