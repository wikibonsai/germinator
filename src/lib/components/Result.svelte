<script lang='ts'>
  import { onMount, tick } from 'svelte';
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  import { isMarkdown, resultMkdn, resultMkmp } from '$lib/util/store';

  $: if ($resultMkdn.descendants && $resultMkdn.descendants.length > 0) {
    delayAndGenerate();
  }
  $: if (!$isMarkdown) {
    delayAndGenerate();
  }

  onMount(() => {
    generateMarkmap();
  });

  // note: markmap + svelte reactivity seems finicky...
  //       ...add a delay to ensure markmap is drawn smoothly
  function delayAndGenerate(): void {
    setTimeout(() => generateMarkmap(), 100);
  }

  // very helpful: https://svelte.dev/repl/9499dbcf3f3240e4af42e38ab19cc9ea?version=3.47.0
  async function generateMarkmap(): Promise<void> {
    // wait for the DOM to update
    // await tick();
    // setup
    const transformer = new Transformer();
    const { root, features } = transformer.transform($resultMkdn.descendants);
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
    while ($resultMkmp && $resultMkmp.firstChild) {
      $resultMkmp.removeChild($resultMkmp.firstChild);
    }
    Markmap.create('#markmap', undefined, root);
  }
</script>

<div class="flex whitespace-pre-wrap box-border bg-white text-black p-4 mb-10 rounded-lg"
     style="display: {($resultMkdn.descendants === '') ? 'none' : 'flex'}">
  {#if $isMarkdown}
    {@html $resultMkdn.descendants}
  {:else}
    <svg id="markmap"
        bind:this={$resultMkmp}
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
    </svg>
  {/if}
</div>

<style>
  svg {
    width: 800px;
    height: 800px;
  }
</style>
