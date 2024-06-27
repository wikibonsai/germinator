import type { PageLoad } from './$types';


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageLoad = async ({ parent, data }) => {
  await parent();
  // note: data comes from
  const { query } = data;
  return {
    query,
  };
}
