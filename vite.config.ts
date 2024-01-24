import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  // allows vite access to top level markdown dirs (./trees)
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
