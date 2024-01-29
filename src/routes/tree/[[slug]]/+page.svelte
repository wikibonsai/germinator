<script lang='ts'>
  import type { PageData } from './$types'
  import { page } from '$app/stores';
  import { ROUTE_GERMINATOR, ROUTE_ROOT, ROUTE_TREE } from '$lib/util/const';
  import { goTo } from '$lib/util/func';
  import { resultMkmp } from '$lib/util/store';
  import AboutButton from '$lib/components/AboutButton.svelte';
  import CopyButton from '$lib/components/CopyButton.svelte';
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
        <CopyButton markdown={data.tree.markdown}></CopyButton>
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
  /* not sure why this isn't carrying over from 'styles.css'... */
  a {
    color: #00CC92;
  }

  .btn {
    background: var(--btn-color);
    color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    /* margin: 0.5rem; */
  }

  .btn:hover {
    cursor: pointer;
    background: var(--btn-color--hover);
  }

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
