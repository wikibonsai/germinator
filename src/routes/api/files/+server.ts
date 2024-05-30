import type { RequestHandler } from '@sveltejs/kit';
import { walkDir } from '$lib/util/file';


export async function GET({ url }) {
  console.debug('GET /api/files', url);
  const path: string = url.searchParams.get('path') || '.';
  try {
    const tree: FileSystemNode = await walkDir(path);
    const body: string = JSON.stringify(tree);
    return new Response(body, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
