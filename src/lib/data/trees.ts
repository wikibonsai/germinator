import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { browser } from '$app/environment';
import type { Tree } from '$lib/types';


// we require some server-side APIs to parse all metadata
// (not sure if this is actually doing anything...)
if (browser) {
  throw new Error(`maps can only be imported server-side`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 'knowledge bonsai'
// 'bonsai tree'
// 'semantic tree'
export const trees: Tree[] = Object.entries(import.meta.glob('/trees/**/*.md', { eager: true }))
                                   .map(([filepath, tree]) => {
                                     const fname: string = path.basename(filepath, '.md');
                                     const title: string = (fname === '_index') ? 'index' : filepath.split('/').slice(-1)[0].replace('.md', '');
                                     const slug: string =  (fname === '_index') ? '' : filepath.split('/').slice(-1)[0].replace('.md', '');
                                     const route: string = '/tree/' + slug;
                                     const absPath: string = path.join(__dirname, '..', '..', '..', filepath);
                                     const markdown: string = fs.readFileSync(absPath, 'utf-8');
                                     return {
                                       fname,
                                       title,
                                       markdown,
                                       slug,
                                       route,
                                     };
                                   });
