<script lang='ts'>
  import { isMarkdown, resultMkdn } from '$lib/util/store';
  import { onMount, tick } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  import ApiKey from "$lib/components/APIKey.svelte";
  import Header from "$lib/components/Header.svelte";
  import Search from "$lib/components/Search.svelte";
  import ToolBox from "$lib/components/ToolBox.svelte";

  let loading: boolean = false;
  let resultMkmp: any = null;

  // markmap svg handling

  // very helpful: https://svelte.dev/repl/9499dbcf3f3240e4af42e38ab19cc9ea?version=3.47.0
  async function generateMarkmap(): Promise<any> {
    if (!$isMarkdown) {
      // wait for the DOM to update
      await tick();
      // generate markmap
      const transformer = new Transformer();
      const { root, features } = transformer.transform(resultMkdn);
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
      clearSVG();
      Markmap.create('#markmap', undefined, root);
    }
  }

  function clearSVG() {
    while (resultMkmp && resultMkmp.firstChild) {
      resultMkmp.removeChild(resultMkmp.firstChild);
    }
  }

  function load(event: CustomEvent<boolean>) {
    loading = event.detail;
  }
</script>

<div class="font-sans mx-10">
  <div class="container mx-auto p-4">
    <Header></Header>
    <!-- tools -->
    <Search on:loading={load}></Search>
    <ToolBox></ToolBox>
    {#if loading}
      <!-- loader -->
      <div id="loader" class="sprout-loader">
        <div class="sprout"></div>
        <div class="leaf left"></div>
        <div class="leaf right"></div>
      </div>
    {/if}
    <!-- results -->
    <div class="result-box whitespace-pre-wrap bg-white text-black input-border p-4 mb-10 rounded-lg"
          style="display: {($resultMkdn === '') ? 'none' : 'flex'}">
      {#if $isMarkdown}
        {@html $resultMkdn}
      {:else}
        <svg id="markmap"
             style="width: 800px; height: 800px"
             bind:this={resultMkmp}
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
        </svg>
      {/if}
    </div>
  </div>
  <ApiKey></ApiKey>
</div>
