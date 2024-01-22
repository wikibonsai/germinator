import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { browser } from '$app/environment';
import type { Bonsai } from '$lib/types';


// we require some server-side APIs to parse all metadata
if (browser) {
  throw new Error(`maps can only be imported server-side`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const bonsais: Bonsai[] = Object.entries(import.meta.glob('/bonsais/**/*.md', { eager: true }))
                                 .map(([filepath, bonsai]) => {
                                   const title: string = filepath.split('/').slice(-1)[0].replace('.md', '');
                                   const slug: string =  filepath.split('/').slice(-1)[0].replace('.md', '');
                                   const route: string = '/bonsai/' + slug;
                                   const absPath: string = path.join(__dirname, '..', '..', '..', filepath);
                                   const markdown: string = fs.readFileSync(absPath, 'utf-8');
                                   return {
                                     title,
                                     markdown,
                                     slug,
                                     route,
                                   };
                                 });
