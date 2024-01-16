<script lang='ts'>
  import { isMarkdown, resultMkdn } from '$lib/util/store';
  import ApiKey from "$lib/components/APIKey.svelte";
  import Header from "$lib/components/Header.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import MarkMap from "$lib/components/MarkMap.svelte";
  import Search from "$lib/components/Search.svelte";
  import ToolBar from "$lib/components/ToolBar.svelte";

  let loading: boolean = false;

  function load(event: CustomEvent<boolean>) {
    loading = event.detail;
  }
</script>

<div class="font-sans mx-10">
  <div class="container mx-auto p-4">
    <!-- colors handled in header -->
    <Header></Header>
    <Search on:loading={load}></Search>
    <ToolBar></ToolBar>
    {#if loading}
      <Loader></Loader>
    {/if}
    <!-- results -->
    <div class="flex whitespace-pre-wrap box-border bg-white text-black p-4 mb-10 rounded-lg"
          style="display: {($resultMkdn === '') ? 'none' : 'flex'}">
      {#if $isMarkdown}
        {@html $resultMkdn}
      {:else}
        <MarkMap></MarkMap>
      {/if}
    </div>
  </div>
  <ApiKey></ApiKey>
</div>
