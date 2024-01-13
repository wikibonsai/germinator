<script lang='ts'>
  import { onMount } from 'svelte';
  import ApiKey from "$lib/APIKey.svelte";
  import AboutModal from "$lib/AboutModal.svelte";
  import MkdnFrmtModal from "$lib/MkdnFrmtModal.svelte";

  // theme colors

  var isDark: boolean = false;

  function toggleTheme() {
    isDark = !isDark;
    updateThemeElements();
  }

  // Function to update elements based on the current theme
  function updateThemeElements() {
    const favicon: Element | null = document.querySelector('[rel="icon"]');
    const logo: HTMLElement | null = document.getElementById('wikibonsai-logo');
    const helpIcon: HTMLElement | null = document.getElementById('helpIcon');
    const resultFormatIcon: HTMLElement | null = document.getElementById('resultFormatIcon');
    const mkdnFormatIcon: HTMLElement | null = document.getElementById('mkdnFormatIcon');
    const copyIcon: HTMLElement | null = document.getElementById('copyIcon');
    // update colors
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    favicon.href         = isDark ? './favicon-dark.png' : './favicon-light.png';
    logo.src             = isDark ? './img/logo/wikibonsai-dark.svg' : './img/logo/wikibonsai-light.svg';
    helpIcon.src         = isDark ? './img/icons/icons8-help-50-dark.png' : './img/icons/icons8-help-50-light.png';
    resultFormatIcon.src = isDark ? './img/icons/icons8-mind-map-30-dark.png' : './img/icons/icons8-mind-map-30-light.png';
    mkdnFormatIcon.src   = isDark ? './img/icons/icons8-adjust-30-dark.png' : './img/icons/icons8-adjust-30-light.png';
    copyIcon.src         = isDark ? './img/icons/icons8-copy-30-dark.png' : './img/icons/icons8-copy-30-light.png';
    localStorage.setItem('is-dark', String(isDark));
  }

  // modals

  let isAbtMdlOpen: boolean = false;
  function toggleAbtMdl(): void {
    isAbtMdlOpen = !isAbtMdlOpen;
  }

  let isFrmtMdlOpen: boolean = false;
  function toggleFrmtMdl(): void {
    isFrmtMdlOpen = !isFrmtMdlOpen;
  }


  // set the initial theme
  onMount(() => {
    const prefersDarkScheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedIsDark: string | null = localStorage.getItem('is-dark');
    isDark = (storedIsDark !== null) ? (storedIsDark === 'true') : prefersDarkScheme;
    updateThemeElements();
  });
</script>

<div class="font-sans mx-10">
  <!-- <div style="display: contents">%sveltekit.body%</div> -->
  <div class="container mx-auto p-4">
    <div class="flex items-center mb-2 p-10 justify-center sm:justify-start">
      <a href="https://github.com/wikibonsai/wikibonsai">
        <img id="wikibonsai-logo" alt="Logo" width="75px" height="60px" class="mr-4" />
      </a>
      <h1 class="text-4xl font-semibold my-0 mx-4 hidden sm:block">
        Semantic Tree Germinator
      </h1>
      <button id="colorsButton" class="colors-button" on:click={toggleTheme}>
        {isDark ? '🌘' : '☀️'}
      </button>
    </div>
    <div class="flex items-center gap-2.5">
      <input
        id="input"
        type="text"
        placeholder="tree (linguistics)"
        class="input-border text-black focus:outline-green-500 p-2 mb-4 w-full rounded-lg">
      <button id="growButton" class="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg hover:bg-green-600">
        Grow
      </button>
    </div>
    <div class="flex justify-end items-center mb-4">
      <!-- About -->
      <button id="aboutButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              title="Format"
              on:click={toggleAbtMdl}>
        <img id="helpIcon" alt="Format" class="w-6 h-6">
      </button>
      <!-- Format Markdown (toolbox) -->
      <button id="mkdnFormatButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              title="Format"
              on:click={toggleFrmtMdl}>
        <img id="mkdnFormatIcon" alt="Format" class="w-6 h-6">
      </button>
      <!-- Format Result -->
      <button id="resultFormatButton" class="rounded button-border hover:border-green-500 p-2 mr-2">
        <img id="resultFormatIcon" alt="Toggle Format" class="w-6 h-6">
      </button>
      <!-- Copy icon -->
      <button id="copyButton" class="rounded button-border hover:border-green-500 p-2 mr-2" title="Copy">
        <img id="copyIcon" alt="Copy" class="w-6 h-6">
      </button>
    </div>
    <div id="loader" class="sprout-loader">
      <div class="sprout"></div>
      <div class="leaf left"></div>
      <div class="leaf right"></div>
    </div>
    <!-- results -->
    <div id="resultBox" class="result-box whitespace-pre-wrap bg-white text-black input-border p-4 mb-10 rounded-lg"></div>
  </div>

  <ApiKey></ApiKey>

  <AboutModal bind:isOpen={isAbtMdlOpen}></AboutModal>
  <MkdnFrmtModal bind:isOpen={isFrmtMdlOpen}
                 bind:indentKind={indentKind}
                 bind:textKind={textKind}
                 bind:caseKind={caseKind}
                 bind:whiteSpaceKind={whiteSpaceKind}>
  </MkdnFrmtModal>

  <!-- local scripts -->

  <!--
    note:
      these scripts are separated for cosmetic (and sanity) reasons. this all still acts like a giant single html file so most things are happening in the global namespace. if anything ever seems confusing, sense might be made by referring back to this html file.

      if this project grows further, it should probably first be refactored to use a proper front-end framework.
  -->

  <!-- vars -->
  <script src="/js/var/prompt.js" type="text/javascript"></script>
  <!-- system -->
  <script src="/js/ai.js" type="text/javascript"></script>
  <!-- components -->
  <script src="/js/components/result-format.js" type="text/javascript"></script>
  <script src="/js/components/copy.js" type="text/javascript"></script>
  <script src="/js/components/submit.js" type="text/javascript"></script>
  <!-- go -->
  <script src="/js/init.js" type="text/javascript"></script>

</div>
