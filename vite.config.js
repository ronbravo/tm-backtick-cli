import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig ({
  build: {
    outDir: '../../../dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        // chunkFileNames: `assets/[name].js`,
        // assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  publicDir: '../../../public',
  root: 'src/js/browser',
  server: {
    port: 2001,
  },
});
