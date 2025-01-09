import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    fs: {
      allow: [
        path.resolve(__dirname),
      ]
    }
  }
});
