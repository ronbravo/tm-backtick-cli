import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { join } from 'path';

let shared = {
  base: '',
}

function setup () {
  let base;

  base = fileURLToPath (import.meta.url);
  base = join (base, '..');

  shared.base = base;
  shared.common = join (base, 'src', 'js', 'common');
}

setup ();

// https://vitejs.dev/config/
export default defineConfig ({
  build: {
    outDir: '../../../dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        // entryFileNames: `assets/[name].[extension]`,
        // chunkFileNames: `assets/[name].js`,
        // assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  publicDir: '../../../public',
  resolve: {
    // alais: [
    //   { find: 'bob', replacement: shared.common },
    // ]
    alias: {
      '~common': shared.common,
    },
  },
  root: 'src/js/browser',
  server: {
    port: 2001,
  },
});
