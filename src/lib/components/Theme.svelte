<script lang='ts'>
  import { onMount } from 'svelte';
  import { isDark, theme } from '$lib/util/store';

  $: if (typeof window !== 'undefined') { // wrapper to ensure this only runs client-side
    if ($isDark) {
      $theme = 'dark';
      document.body.classList.add('dark');
    } else {
      $theme = 'light';
      document.body.classList.remove('dark');
    }
  }
  $: if (typeof window !== 'undefined') { // wrapper to ensure this only runs client-side
    const link: HTMLLinkElement = document.querySelector("[rel='icon']") || createFaviconLink();
    link.href = favicon;
  }
  $: favicon          = `./favicon-${$theme}.png`;
  
  onMount(() => {
    const prefersDarkScheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedIsDark: string | null = localStorage.getItem('is-dark');
    $isDark = (storedIsDark !== null) ? (storedIsDark === 'true') : prefersDarkScheme;
  });

  function createFaviconLink(): HTMLLinkElement {
    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
    return link;
  }

  function toggleTheme(): void {
    $isDark = !$isDark;
    localStorage.setItem('is-dark', String($isDark));
  }
</script>

<button id="colorsButton"
          class="colors-button"
          on:click={toggleTheme}>
  {$isDark ? '🌘' : '☀️'}
</button>

<style>
  .colors-button {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 18px;
    cursor: pointer;
  }
</style>
