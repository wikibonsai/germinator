<script lang='ts'>
  import ApiKey from "$lib/components/APIKey.svelte";
  import Header from "$lib/components/Header.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Result from "$lib/components/Result.svelte";
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
    <Result></Result>
  </div>
  <ApiKey></ApiKey>
</div>
