<script lang='ts'>
  import type { PageData } from './$types'
  import { page } from '$app/stores';
  import { ROUTE_GERMINATOR, ROUTE_ROOT, ROUTE_TREE } from '$lib/util/const';
  import { goTo } from '$lib/util/func';
  import { resultMkmp } from '$lib/util/store';
  import AbtBtn from '$lib/components/element/AbtBtn.svelte';
  import CpyBtn from '$lib/components/element/CpyBtn.svelte';
  import DropDown from '$lib/components/element/DropDown.svelte';
  import Logo from '$lib/components/element/Logo.svelte';
  import MarkMap from '$lib/components/component/MarkMap.svelte';
  import Theme from '$lib/components/element/Theme.svelte';

  export let data: PageData;
</script>

<div class="main">
  <div class="overlay">
    <div class="ctrl-panel">
      <Logo></Logo>
      <div class="ctrl-btns">
        <AbtBtn></AbtBtn>
        <CpyBtn markdown={data.tree.markdown}></CpyBtn>
        <button class="btn" on:click={goTo(($page.url.pathname === ROUTE_TREE) ? ROUTE_ROOT : ROUTE_TREE)}>back</button>
        <!-- #todo: dropdown -->
        <!-- <DropDown title={data.tree.title} items={data.trees}></DropDown> -->
      </div>
      <!-- #todo: germinator -->
      <!-- <span class="grow-your-own">
        Grow your own with <a href={ROUTE_GERMINATOR}>The Germinator!</a>
      </span> -->
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
  .ctrl-btns {
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
    /* small */
    max-width: 45vw;
  }

  .grow-your-own {
    color: var(--accent-text-color);
    font-size: 0.75rem;
    align-self: center;
    padding: 0.5rem;
  }

  .main {
    height: 100vh;
    width: 100vw;
    font-family: sans-serif;
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

  @media(min-width: 768px) {
    .ctrl-panel {
      max-width: 20vw;
    }
  }
</style>
