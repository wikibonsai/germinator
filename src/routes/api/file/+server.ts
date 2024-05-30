import type { RequestHandler } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import { openFile } from '$lib/util/file';


export async function GET({ url }) {
  console.debug('GET /api/file', url);
  const path: string = url.searchParams.get('path') || '.';
  try {
    const content: string = await openFile(path);
    return new Response(content, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
