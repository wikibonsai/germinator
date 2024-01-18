import fs from 'fs';
import path from 'path';
import type { PageServerLoad } from './$types'


// ref: https://scottspence.com/posts/passing-sveltekit-page-server-js-data-to-page-js
export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const filePath: string = path.join('maps', `${slug}.md`);
  const markdown: string = fs.readFileSync(filePath, 'utf-8');

  return {
    title: slug,
    markdown,
  };
}
