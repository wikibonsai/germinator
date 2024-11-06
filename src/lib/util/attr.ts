import matter from 'gray-matter';
import * as caml from 'caml-mkdn';


export function extractTldr(markdown: string): string {
  // yaml
  if (markdown.includes('---')) {
    const payload: any = matter(markdown);
    const data: any = payload.data;
    if (data.tldr) {
      return data.tldr;
    }
  // caml
  } else {
    const payload: any = caml.load(markdown);
    if (payload.data && payload.data.tldr) {
      return payload.data.tldr;
    }
  }
  return '';
}
