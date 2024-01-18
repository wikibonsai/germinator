<script lang='ts'>
  import type { PageData } from './$types'
  import MarkMap from '$lib/components/MarkMap.svelte';
  import Theme from '$lib/components/Theme.svelte';
  import { resultMkmp } from '$lib/util/store';

  export let data: PageData;
</script>

<div class="main">
  <div class="container">
    <div>
      <h1>{data.title}</h1>
      <Theme></Theme>
    </div>
    <MarkMap markdown={data.markdown} bind:markmap={$resultMkmp}></MarkMap>
    </div>
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
