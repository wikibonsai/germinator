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
    <div class="flex-center">
      <Logo></Logo>
      <h1 class="title-style">
        Germinator
      </h1>
      <Theme pin={true}></Theme>
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
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
  }

  .flex-center {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    justify-content: center;
  }

  .main {
    font-family: sans-serif;
    margin-left: 2.5rem;
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

  .title-style {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    display: none;
  }

  @media (min-width: 640px) {
    .flex-center {
      justify-content: flex-start;
    }

    .title-style {
      display: block;
    }
  }
</style>
