<script lang='ts'>
  import { theme } from '$lib/util/store';
  import Theme from '$lib/components/Theme.svelte';

  $: logo             = `./img/logo/wikibonsai-${$theme}.svg`;
</script>

<div class="flex items-center mb-2 p-10 justify-center sm:justify-start">
  <a href="https://github.com/wikibonsai/wikibonsai">
    <img id="wikibonsai-logo"
         class="mr-4"
         width="75px"
         height="60px"
         src={logo}
         alt="Logo" />
  </a>
  <h1 class="text-4xl font-semibold my-0 mx-4 hidden sm:block">
    Germinator
  </h1>
  <Theme></Theme>
</div>
