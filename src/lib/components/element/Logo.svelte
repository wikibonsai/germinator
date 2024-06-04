<script lang='ts'>
  import { URL_REPO_GERMINATOR, URL_WIKIBONSAI } from '$lib/util/const';
  import { theme } from '$lib/util/store';

  export let which: string = 'germinator';
  // note: 'wTxt' is short for 'with text'
  export let wTxt: boolean = false;
  export let size: string = 'medium';

  $: logo = (which === 'germinator' ) ? '/img/logo/germinator.svg' : `/img/logo/wikibonsai-${$theme}.svg`;
  $: logoTxt = (which === 'germinator') ? 'Germinator' : 'WikiBonsai';
  $: logoUrl = (which === 'germinator') ? URL_REPO_GERMINATOR : URL_WIKIBONSAI;

  $: dimensions = {
    small: { width: '50px', height: '40px' },
    medium: { width: '75px', height: '60px' },
    large: { width: '100px', height: '80px' }
  }[size] || { width: '75px', height: '60px' }; // Default to medium if size is not recognized
</script>

<div class="logo-container">
  <a href={logoUrl}>
    <img id="logo"
        src={logo}
        style={`width: ${dimensions.width}; height: ${dimensions.height};`}
        alt="Logo" />
  </a>
  {#if wTxt}
    <div class="logo">{logoTxt}</div>
  {/if}
</div>

<style>
  .logo {
    font-size: 1.5rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
</style>
