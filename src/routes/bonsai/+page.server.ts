import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Bonsai } from '$lib/types';
import { bonsais } from '$lib/data/bonsais';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  const bonsaisData: { title: string, route: string }[] = bonsais.map((bonsai: Bonsai) => {
    return {
      title: bonsai.title,
      route: bonsai.route,
    }
  });
  const bonsai: Bonsai | undefined = bonsais.find((bonsai: Bonsai) => bonsai.fname === '_base');
  // if page doesn't exist, 404
  if (bonsai === undefined) {
    throw error(404, 'Page not found');
  }
  return {
    bonsais: bonsaisData,
    bonsai,
  };
}
