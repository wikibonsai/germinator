import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';


export const prerender: boolean = false;

// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  return { apiKey: OPENAI_API_KEY };
  // throw error(404, 'Page not found');
}
