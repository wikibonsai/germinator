import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Tree } from '$lib/types';
import { trees } from '$lib/data/trees';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const treesData: { title: string, route: string }[] = trees.map((tree: Tree) => {
    return {
      title: tree.title,
      route: tree.route,
    }
  });
  const tree: Tree | undefined = trees.find((tree: Tree) => tree.slug === slug);
  // if page doesn't exist, 404
  if (tree === undefined) {
    throw error(404, 'Page not found');
  }
  return {
    trees: treesData,
    tree,
  };
}
