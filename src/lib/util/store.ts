import type { Writable } from 'svelte/store';
import type { OptLLM, OptMkdn } from './types';
import { derived, writable } from 'svelte/store';
import {
  DEFAULT_MODEL_ANTHROPIC,
  DEFAULT_MODEL_OPENAI,
  DEFAULT_MODEL_XAI,
} from './const';
import { extractTldr } from './attr';


// api

export const llm: Writable<OptLLM> = writable({
  provider: 'anthropic',
  anthropic: {
    model: DEFAULT_MODEL_ANTHROPIC,
    apiKey: '',
  },
  openai: {
    model: DEFAULT_MODEL_OPENAI,
    apiKey: '',
  },
  xai: {
    model: DEFAULT_MODEL_XAI,
    apiKey: '',
  },
});
// note: this is mostly for debugging for now
export const systemApiKeys: Writable<Record<string, string>> = writable({
  anthropic: '',
  openai: '',
  xai: '',
});

// colors

export const isDark: Writable<boolean> = writable(false);
export const theme: Writable<string> = writable('light');

// markdown format

export const isMarkdown: Writable<boolean> = writable(true);
export const mkdnFrmt: Writable<OptMkdn> = writable({
  // tree
  indentKind: '',
  textKind: '',
  caseKind: '',
  whiteSpaceKind: '',
  // attrs
  attrKind: '',
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
    },
    xai: {
      ...currentLlm.xai,
      apiKey: localStorage.getItem('api-key-xai') || ''
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

export const resultMkdn: Writable<Record<string, string>> = writable({
  all: '',
  ancestors: '',
  descendants: '',
  atom: '',
});
export const resultMkdnTLDR = derived(
  resultMkdn,
  $resultMkdn => $resultMkdn.atom ? extractTldr($resultMkdn.atom) : ''
);
export const resultAtmp: Writable<any | null> = writable(null);
export const resultMkmp: Writable<SVGSVGElement | null> = writable(null);

export function resetMkdnResult(): void {
  resultMkdn.update(() => ({
    all: '',
    ancestors: '',
    descendants: '',
    atom: '',
  }));
}
