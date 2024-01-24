import type { PageLoad } from './$types'


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageLoad = async ({ parent, data }) => {
  await parent();
  const { trees } = data;
  return { trees };
}
