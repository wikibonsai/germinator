import { writable } from 'svelte/store';

export const isDark = writable(false);
export const theme = writable('light');

// api

export const apiKey = writable('');

// result

export const resultMkdn = writable('');
