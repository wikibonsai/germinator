import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  // allows vite access to ./bonsais
  server: {
    fs: {
      allow: ['./']
    }
  },
  assetsInclude: ['**/*.md'],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
