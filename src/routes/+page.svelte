<script>
  import AboutModal from "$lib/AboutModal.svelte";
  import FormatModal from "$lib/FormatModal.svelte";
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
      <button id="colorsButton" class="colors-button">🌘</button>
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
      <button id="aboutButton" class="rounded button-border hover:border-green-500 p-2 mr-2" title="Format">
        <img id="helpIcon" alt="Format" class="w-6 h-6">
      </button>
      <!-- Format Markdown (toolbox) -->
      <button id="mkdnFormatButton" class="rounded button-border hover:border-green-500 p-2 mr-2" title="Format">
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

  <!-- api key input -->

  <div class="fixed bottom-4 right-4 w-full max-w-xs flex flex-row gap-1 rounded p-1.5 z-50 pointer-events-none api-key-input-bg-color">
    <div class="relative flex-grow pointer-events-auto">
      <input
        id="openai_key_risky_but_cool"
        type="password"
        class="w-full px-3 py-1.5 bg-gray-200 text-sm border-none rounded focus:outline-none focus:bg-white focus:text-gray-800"
        placeholder="Your OpenAI API Key (risky but cool)"
        onfocus="this.type='text';"
        onblur="this.type='password';"
      />
    </div>
    <button class="flex-shrink-0 w-8 h-8 rounded p-0 cursor-pointer flex items-center justify-center pointer-events-auto" onclick="alert('If you have an OpenAI developer key, you can put it in this input and it will be used when posting to OpenAI.\n\nSee https://platform.openai.com/api-keys to get a key.\n\nPutting API keys into boxes is generally a bad idea! If you have any concerns, create an API key and then revoke it after using this site.)')">
      <img id="helpApiKeyIcon" src="/img/icons/icons8-help-50.png" class="fill-current text-gray-600">
    </button>
  </div>

  <AboutModal></AboutModal>
  <FormatModal></FormatModal>

  <!-- local scripts -->

  <!--
    note:
      these scripts are separated for cosmetic (and sanity) reasons. this all still acts like a giant single html file so most things are happening in the global namespace. if anything ever seems confusing, sense might be made by referring back to this html file.

      if this project grows further, it should probably first be refactored to use a proper front-end framework.
  -->

  <!-- vars -->
  <script src="/js/var/prompt.js" type="text/javascript"></script>
  <script src="/js/var/state.js" type="text/javascript"></script>
  <!-- system -->
  <script src="/js/ai.js" type="text/javascript"></script>
  <!-- components -->
  <script src="/js/components/api-key.js" type="text/javascript"></script>
  <script src="/js/components/colors.js" type="text/javascript"></script>
  <script src="/js/components/about.js" type="text/javascript"></script>
  <script src="/js/components/result-format.js" type="text/javascript"></script>
  <script src="/js/components/mkdn-format.js" type="text/javascript"></script>
  <script src="/js/components/copy.js" type="text/javascript"></script>
  <script src="/js/components/submit.js" type="text/javascript"></script>
  <!-- go -->
  <script src="/js/init.js" type="text/javascript"></script>

</div>
