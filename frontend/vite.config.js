// ../frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@a': path.resolve(__dirname, './src/assets'),
      '@p': path.resolve(__dirname, './src/pages'),
      '@s': path.resolve(__dirname, './src/styles'),
      '@h': path.resolve(__dirname, './src/hooks')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
		secure: false,
		ws: true,
		// rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: { sourcemap: false }
});
