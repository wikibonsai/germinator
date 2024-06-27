import type { Writable } from 'svelte/store';
import type { OptLLM, OptMkdn } from './types';
import { writable } from 'svelte/store';
import { DEFAULT_MODEL_ANTHROPIC, DEFAULT_MODEL_OPENAI } from './const';


// colors

export const isDark: Writable<boolean> = writable(false);
export const theme: Writable<string> = writable('light');

// markdown format

export const mkdnFrmt: Writable<OptMkdn> = writable({
  // tree
  indentKind: '',
  textKind: '',
  caseKind: '',
  whiteSpaceKind: '',
  // attrs
  attrKind: '',
});

export function resetMkdnResult(): void {
  resultMkdn.update(() => ({
    all: '',
    ancestors: '',
    descendants: '',
    atom: '',
  }));
  resultAtmp.update(() => null);
  resultMkmp.update(() => null);
}

// api

export const llm: Writable<OptLLM> = writable({
  provider: 'anthropic',
  anthropic: {
    model: DEFAULT_MODEL_ANTHROPIC,
    apiKey: '',
  },
  openai: {
    model: 'chatgpt',
    apiKey: DEFAULT_MODEL_OPENAI,
  },
});
// note: this is mostly for debugging for now
export const systemApiKeys: Writable<Record<string, string>> = writable({
  anthropic: '',
  openai: '',
});

// options

export function initOpts(): void {
  // llm opts
  llm.update(currentLlm => ({
    ...currentLlm,
    provider: localStorage.getItem('provider') || 'openai',
    model: localStorage.getItem('model') || 'chatgpt',
    anthropic: {
      ...currentLlm.anthropic,
      apiKey: localStorage.getItem('api-key-anthropic') || '',
    },
    openai: {
      ...currentLlm.openai,
      apiKey: localStorage.getItem('api-key-openai') || ''
    }
  }));
  // mkdn format options
  mkdnFrmt.update(currentMkdnFrmt => ({
    ...currentMkdnFrmt,
    indentKind: localStorage.getItem('indent') || '2 spaces',
    textKind: localStorage.getItem('text') || '[[wiki text]]',
    caseKind: localStorage.getItem('case') || 'lower',
    whiteSpaceKind: localStorage.getItem('whitespace') || 'kabob-space',
    attrKind: localStorage.getItem('attrs') || 'caml'
  }));
}

// user input

export const userConcept: Writable<string> = writable('');

// result

export const isMarkdown: Writable<boolean> = writable(true);

export const resultMkdn: Writable<Record<string, string>> = writable({
  all: '',
  ancestors: '',
  descendants: '',
  atom: '',
});
export const resultAtmp: Writable<any | null> = writable(null);
export const resultMkmp: Writable<SVGSVGElement | null> = writable(null);

