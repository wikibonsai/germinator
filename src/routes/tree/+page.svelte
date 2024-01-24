<script lang='ts'>
  import type { PageData } from './$types'
  import { resultMkmp } from '$lib/util/store';
  import AboutButton from '$lib/components/AboutButton.svelte';
  import DropDown from '$lib/components/DropDown.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import MarkMap from '$lib/components/MarkMap.svelte';
  import Theme from '$lib/components/Theme.svelte';

  export let data: PageData;
</script>

<div class="main">
  <div class="overlay">
    <div class="ctrl-panel">
      <Logo></Logo>
      <div class="ctrl">
        <AboutButton></AboutButton>
        <DropDown title={data.tree.title} items={data.trees}></DropDown>
      </div>
    </div>
    <Theme pin={true}></Theme>
  </div>
  <MarkMap markdown={data.tree.markdown}
           bind:markmap={$resultMkmp}
           height={100}
           width={100}>
  </MarkMap>
</div>

<style>
  .ctrl {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .ctrl-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .main {
    height: 100vh;
    width: 100vw;
    font-family: sans-serif;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }

  .overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 1rem;
  }
</style>
