import type { PageLoad } from './$types'


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageLoad = async ({ parent, data }) => {
  await parent();
  return {
    trees: data.trees,
    title: data.tree.title,
    markdown: data.tree.markdown,
    slug: data.tree.slug,
  }
}
