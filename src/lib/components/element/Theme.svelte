<script lang='ts'>
  import { onMount } from 'svelte';
  import { isDark, theme } from '$lib/util/store';

  export let pin: boolean = false;

  $: if (typeof window !== 'undefined') { // wrapper to ensure this only runs client-side
    if ($isDark) {
      $theme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      $theme = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  onMount(() => {
    const prefersDarkScheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedIsDark: string | null = localStorage.getItem('is-dark');
    $isDark = (storedIsDark !== null) ? (storedIsDark === 'true') : prefersDarkScheme;
  });

  function toggleTheme(): void {
    $isDark = !$isDark;
    localStorage.setItem('is-dark', String($isDark));
  }
</script>

<button id="colorsButton"
        class="colors-button img-btn {pin ? 'absolute-position' : 'flex-friendly'}"
        on:click={toggleTheme}>
  {$isDark ? '🌘' : '☀️'}
</button>

<style>
  .absolute-position {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .colors-button {
    cursor: pointer;
    font-size: 18px;
  }

  .flex-friendly {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
</style>
