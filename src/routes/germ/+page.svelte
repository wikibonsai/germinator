<script lang='ts'>
  import ApiKey from "$lib/components/APIKey.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Logo from '$lib/components/Logo.svelte';
  import Result from "$lib/components/Result.svelte";
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
    <Result></Result>
  </div>
  <ApiKey></ApiKey>
</div>

<style>
  .main {
    font-family: sans-serif; /* Tailwind's 'font-sans' uses a specific sans-serif font stack */
    margin-left: 2.5rem; /* Assuming 1rem = 4 units, so 10 units = 2.5rem */
    margin-right: 2.5rem;
  }

  .container {
    width: 100%;
    max-width: 640px; /* Tailwind's 'container' class has responsive widths, 640px is one example */
    margin-left: auto;
    margin-right: auto;
    padding: 1rem; /* 4 units of Tailwind's spacing scale */
  }
</style>
