import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';


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
  }
});
