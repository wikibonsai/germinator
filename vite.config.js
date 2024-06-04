import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';


export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    })
  ],
  // allows vite access to top level markdown dirs (./trees)
  server: {
    fs: {
      allow: ['./']
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  // to get 'gray-matter' working...
  // from: https://github.com/jonschlinkert/gray-matter/issues/143#issuecomment-1119218579
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
});
