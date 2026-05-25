import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/alumni-admin-system-last-version/',
  server: {
    port: 5173,
  },
});