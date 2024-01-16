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
  $: logo             = `./img/logo/wikibonsai-${$theme}.svg`;

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
  <button id="colorsButton"
          class="colors-button"
          on:click={toggleTheme}>
    {$isDark ? '🌘' : '☀️'}
  </button>
</div>
