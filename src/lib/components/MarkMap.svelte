<script lang='ts'>
  import { scaleOrdinal, schemeCategory10, interpolateYlGn } from 'd3';
  import { onMount } from 'svelte';
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  import type { IMarkmapOptions, INode } from 'markmap-common';

  // data
  export let markdown: string = 'no markdown received';
  export let markmap: SVGSVGElement | null;  // todo: make optional...
  // options
  export let height: number = 100;
  export let width: number = 100;
  export let move: boolean = true;

  $: if (markdown && markdown.length > 0) {
    if (markmap) {
      generateMarkmap();
    }
  }

  onMount(() => {
    generateMarkmap();
  });

  export const defaultColorFn = scaleOrdinal(interpolateYlGn(0.2), schemeCategory10);

  // very helpful: https://svelte.dev/repl/9499dbcf3f3240e4af42e38ab19cc9ea?version=3.47.0
  async function generateMarkmap(): Promise<void> {
    // setup
    const transformer = new Transformer();
    const { root, features } = transformer.transform(markdown);
    // styling
    const { styles, scripts } = transformer.getUsedAssets(features);
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => Markmap });
    // options
    const options: IMarkmapOptions = {
      pan: move,
      zoom: move,
      // color: (node: INode): string => defaultColorFn(`${node.state?.path || ''}`),
      // color: (node: INode): string => {
      //   switch (node.depth) {
      //     case 0: return '#8C6239';
      //     default: return '#31AF31';
      //   }
      // },
      color: (node: INode): string => {
        if (node.children && node.children.length > 0) {
          switch (node.depth) {
            case 0: return '#8C6239'; // Root node color
            default: return '#31AF31'; // Other nodes color
          }
        } else {
          return defaultColorFn(`${node.state?.path || ''}`); // Returning undefined will use the default color scheme
          // const roll: number = Math.floor(Math.random() * 4) + 1;
          // if (roll === 1) {
          //   return defaultColorFn(`${node.state?.path || ''}`); // Returning undefined will use the default color scheme
          // } else {
          //   return '#31AF31';
          // }
        }
      },
      //style: id => 'div{padding-bottom:0.25em!important} g g:last-of-type div{font-weight:bold; font-size:18px} foreignObject{overflow:visible!important; transform:translateX(-1%)} g g:last-of-type rect {transform:scaleX(125%) translateX(-3%)}',
      //style: id => 'div{padding-bottom:0.3em!important} g g:last-of-type div{font-weight:bold;} foreignObject{overflow:visible!important; transform:translateX(-1%)}',
      // duration:0,
      // style: (id: string) => 'div{padding-bottom:0.12em!important}',
      style: (id: string) => 'code { background-color: var(--accent-color-light); }',
      // spacingVertical: 8, // 5
      // //spacingHorizontal: 100,
      // paddingX:15, // 8
    }
    // go
    while (markmap && markmap.firstChild) {
      markmap.removeChild(markmap.firstChild);
    }
    Markmap.create('#markmap', options, root);
  }
</script>

<svg id="markmap"
     bind:this={markmap}
     style={`height: ${height}vh; width: ${width}vw;`}
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
</svg>
