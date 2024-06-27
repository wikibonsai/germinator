import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';


export const prerender: boolean = false;

// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js

export const load: PageServerLoad = async ({ params, url }) => {
  // vars
  const query: string = url.searchParams.get('query') || '';
  // throw error(404, 'Page not found');
  // return
  // note: make sure to pass data through on +page.ts too
  return {
    query,
  };
};
