// #todo: germinator
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  // return { apiKey: OPENAI_API_KEY };
  throw error(404, 'Not found');
}
