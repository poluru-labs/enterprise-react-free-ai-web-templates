import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5194, host: true },
  preview: { port: 4194, host: true },
});
