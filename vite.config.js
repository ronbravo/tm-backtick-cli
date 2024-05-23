import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig ({
  build: {
    outDir: '../../../dist',
  },
  publicDir: '../../../public',
  root: 'src/js/browser',
  server: {
    port: 2001,
  },
});
