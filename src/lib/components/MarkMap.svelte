<script lang='ts'>
  import { onMount } from 'svelte';
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  import { isMarkdown, resultMkdn, resultMkmp } from '$lib/util/store';

  export let markdown: string;
  export let markmap: SVGSVGElement | null;

  $: if (markdown && markdown.length > 0) {
    generateMarkmap();
  }

  onMount(() => {
    generateMarkmap();
  });

  // very helpful: https://svelte.dev/repl/9499dbcf3f3240e4af42e38ab19cc9ea?version=3.47.0
  async function generateMarkmap(): Promise<void> {
    // setup
    const transformer = new Transformer();
    const { root, features } = transformer.transform(markdown);
    // styling
    // const { styles, scripts } = transformer.getUsedAssets(features);
    // if (styles) loadCSS(styles);
    // if (scripts) loadJS(scripts, { getMarkmap: () => Markmap });
    // options
    // const options = {
    //   //style: id => 'div{padding-bottom:0.25em!important} g g:last-of-type div{font-weight:bold; font-size:18px} foreignObject{overflow:visible!important; transform:translateX(-1%)} g g:last-of-type rect {transform:scaleX(125%) translateX(-3%)}',
    //   //style: id => 'div{padding-bottom:0.3em!important} g g:last-of-type div{font-weight:bold;} foreignObject{overflow:visible!important; transform:translateX(-1%)}',
    //   duration:0,
    //   style: id => 'div{padding-bottom:0.12em!important}',
    //   spacingVertical: 8, // 5
    //   //spacingHorizontal: 100,
    //   paddingX:15, // 8
    // }
    // go
    while (markmap && markmap.firstChild) {
      markmap.removeChild(markmap.firstChild);
    }
    Markmap.create('#markmap', undefined, root);
  }
</script>

<svg id="markmap"
     bind:this={markmap}
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
</svg>

<style>
  svg {
    width: 800px;
    height: 800px;
  }
</style>
