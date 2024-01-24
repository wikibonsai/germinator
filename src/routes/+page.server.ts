import type { PageServerLoad } from './$types';
import { trees } from '$lib/data/trees';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  return { trees };
}
