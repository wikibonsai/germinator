import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';


export const prerender: boolean = false;

// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js

export const load: PageServerLoad = async ({ params, url }) => {
  const query: string = url.searchParams.get('query') || '';
  let apiKey = '';

  try {
    const env = await import('$env/static/private');
    apiKey = env.OPENAI_API_KEY || '';
  } catch (e) {
    // Handle the case when the environment variable is not defined
    console.warn('OPENAI_API_KEY is not defined');
  }

  // throw error(404, 'Page not found');
  return {
    apiKey,
    query,
  };
};