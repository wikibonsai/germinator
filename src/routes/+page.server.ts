import type { PageServerLoad } from './$types';
import type { Bonsai } from '$lib/types';
import { bonsais } from '$lib/data/bonsais';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  const bonsaisData: Bonsai[] = bonsais.map((bonsai: Bonsai) => {
    return {
      title: bonsai.title,
      route: bonsai.route,
    }
  });
  return { bonsais: bonsaisData };
}
