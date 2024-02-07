// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface OptMkdn {
			attrs: string;      // 'caml' | 'yaml';
			case: string;       // 'upper' | 'lower';
			text: string;       // regular or [[wikitext]];
			indent: string;     // '2 spaces' | '4 spaces' | 'tab';
			whitespace: string; // 'white space' | 'snake_case' | 'kabob-case';
		}

		// 'bonsai tree' / 'semantic tree'
		// for the url '/tree/name-of-tree'
		interface Tree {
			fname: string;     // the filename (basename) of the markdown file
			route: string;     // the route is '/tree/name-of-tree'
			slug: string;      // the slug is 'name-of-tree'
			title: string;     // the title is 'name-of-tree'
												 // (which is the same as the slug,
												 //  which is the sluggified fname -- maybe 'Name of Bonsai')
			markdown?: string; // the markdown is the file content
		}
	}
}

export {};
