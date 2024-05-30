import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// colors

export const isDark: Writable<boolean> = writable(false);
export const theme: Writable<string> = writable('light');

// markdown format

export const mkdnFrmt: Writable<Record<string, string>> = writable({
  // tree
  indentKind: '',
  textKind: '',
  caseKind: '',
  whiteSpaceKind: '',
  // attrs
  attrKind: '',
});

// api

export const apiKey: Writable<string> = writable('');

// result

export const isMarkdown: Writable<boolean> = writable(true);

export const resultMkdn: Writable<Record<string, string>> = writable({
  all: '',
  ancestors: '',
  descendants: '',
  atom: '',
});
export const resultMkmp: Writable<SVGSVGElement | null> = writable(null);

