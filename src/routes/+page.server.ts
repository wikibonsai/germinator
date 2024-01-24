import type { PageServerLoad } from './$types';
import type { Tree } from '$lib/types';
import { trees } from '$lib/data/trees';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  const treesData: { title: string, route: string }[] = trees.map((tree: Tree) => {
    return {
      title: tree.title,
      route: tree.route,
    }
  });
  return {
    trees: treesData,
  }
}
