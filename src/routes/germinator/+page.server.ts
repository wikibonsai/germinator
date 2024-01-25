import type { PageServerLoad } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  return { apiKey: OPENAI_API_KEY };
}
