import type { PageLoad } from './$types'


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageLoad = async ({ parent, data }) => {
  await parent();
  return {
    bonsais: data.bonsais,
    title: data.bonsai.title,
    markdown: data.bonsai.markdown,
    slug: data.bonsai.slug,
  }
}
