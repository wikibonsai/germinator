<script lang='ts'>
  import { isMarkdown, resultMkdn, resultMkmp } from '$lib/util/store';
  import ApiKey from "$lib/components/APIKey.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Logo from '$lib/components/Logo.svelte';
  import MarkMap from '$lib/components/MarkMap.svelte';
  import Search from "$lib/components/Search.svelte";
  import Theme from '$lib/components/Theme.svelte';
  import ToolBar from "$lib/components/ToolBar.svelte";

  let loading: boolean = false;

  function load(event: CustomEvent<boolean>) {
    loading = event.detail;
  }
</script>

<div class="main">
  <div class="container">
    <div class="flex items-center mb-2 p-2 justify-center sm:justify-start">
      <Logo></Logo>
      <h1 class="text-4xl font-semibold my-0 mx-4 hidden sm:block">
        Germinator
      </h1>
      <Theme></Theme>
    </div>
    <Search on:loading={load}></Search>
    <ToolBar></ToolBar>
    {#if loading}
      <Loader></Loader>
    {/if}
    <!-- ancestry -->
    <div class="result-box box-border"
         style="display: {($resultMkdn.ancestors === '') ? 'none' : 'flex'}">
         {@html $resultMkdn.ancestors}
    </div>
    <!-- atom -->
    <div class="result-box box-border"
         style="display: {($resultMkdn.atom === '') ? 'none' : 'flex'}">
         {@html $resultMkdn.atom}
    </div>
    <!-- subtree -->
    <div class="result-box box-border"
         class:stretch-markmap={!$isMarkdown}
         style="display: {($resultMkdn.descendants === '') ? 'none' : 'flex'}">
    {#if $isMarkdown}
      {@html $resultMkdn.descendants}
    {:else}
      <MarkMap markdown={$resultMkdn.descendants}
              bind:markmap={$resultMkmp}
              height={85}
              width={75}>
      </MarkMap>
    {/if}
    </div>
  </div>
  <ApiKey></ApiKey>
</div>

<style>
  .container {
    width: 100%;
    max-width: 640px; /* Tailwind's 'container' class has responsive widths, 640px is one example */
    margin-left: auto;
    margin-right: auto;
    padding: 1rem; /* 4 units of Tailwind's spacing scale */
  }

  .main {
    font-family: sans-serif; /* Tailwind's 'font-sans' uses a specific sans-serif font stack */
    margin-left: 2.5rem; /* Assuming 1rem = 4 units, so 10 units = 2.5rem */
    margin-right: 2.5rem;
  }

  .result-box {
    display: flex;
    white-space: pre-wrap;
    background-color: var(--box-background);
    color: var(--text-color);
    border-radius: 0.5rem;
    margin-bottom: 2.5rem;
    padding: 1rem;
  }

  .stretch-markmap {
    min-height: 800px;
  }
</style>
