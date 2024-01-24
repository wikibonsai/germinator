<script lang='ts'>
  import type { PageData } from './$types'
  import DropDown from '$lib/components/DropDown.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import MarkMap from '$lib/components/MarkMap.svelte';
  import Theme from '$lib/components/Theme.svelte';
  import { resultMkmp } from '$lib/util/store';

  export let data: PageData;
</script>

<div class="main">
  <div class="overlay">
    <div class="ctrl">
      <Logo></Logo>
      <DropDown title={data.tree.title} items={data.trees}></DropDown>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .main {
    height: 100vh;
    width: 100vw;
    font-family: sans-serif; /* Tailwind's 'font-sans' uses a specific sans-serif font stack */
    margin-left: 2.5rem; /* Assuming 1rem = 4 units, so 10 units = 2.5rem */
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
