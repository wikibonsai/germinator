import { writable } from 'svelte/store';

export const isDark = writable(false);
export const theme = writable('light');

// markdown format

export const mkdnFrmt = writable({
  indentKind: '',
  textKind: '',
  caseKind: '',
  whiteSpaceKind: ''
});

// api

export const apiKey = writable('');

// result

export const resultMkdn = writable('');
