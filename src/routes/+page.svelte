<script lang='ts'>
  import { onMount } from 'svelte';
  import ApiKey from "$lib/APIKey.svelte";
  import AboutModal from "$lib/AboutModal.svelte";
  import MkdnFrmtModal from "$lib/MkdnFrmtModal.svelte";
  import { makeReal } from "$lib/ai";

  // theme colors
  var isDark: boolean = false;
  var theme: string = 'light';
  // result format
  var isMarkdown: boolean = true;
  var result: any = null;
  var resultMkdn: string = '';
  var resltMkmp: any = null;
  // mkdn format options
  let indentKind: string | null = '';
  let textKind: string | null = '';
  let caseKind: string | null = '';
  let whiteSpaceKind: string | null = '';

  // image sources based on theme color
  $: favicon          = `./favicon-${theme}.png`;
  $: logo             = `./img/logo/wikibonsai-${theme}.svg`;
  $: helpIcon         = `./img/icons/icons8-help-50-${theme}.png`;
  $: resultFormatIcon = isMarkdown
                        ? `./img/icons/icons8-markdown-30-${theme}.png`
                        : `./img/icons/icons8-mind-map-30-${theme}.png`;
  $: mkdnFormatIcon   = `./img/icons/icons8-adjust-30-${theme}.png`;
  $: copyIcon         = `./img/icons/icons8-copy-30-${theme}.png`;

  function toggleTheme() {
    isDark = !isDark;
    updateThemeElements();
  }

  // Function to update elements based on the current theme
  function updateThemeElements() {
    theme = isDark ? 'dark' : 'light';
    localStorage.setItem('is-dark', String(isDark));
    // update css
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
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

  // result format

  function safelyRemoveChild(parentId: string, childId: string) {
    // Get the parent and child elements by their IDs
    const parentElement: HTMLElement | null = document.getElementById(parentId);
    const childElement: HTMLElement | null = document.getElementById(childId);
    // check if both elements exist and if the child is indeed a child of the parent
    if (parentElement && childElement && parentElement.contains(childElement)) {
      parentElement.removeChild(childElement);
    } else {
      parentElement.innerHTML = '';
    }
  }
  function appendSvgToResultBox() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "markmap");
    svg.setAttribute("style", "width: 800px; height: 800px");
    const resultBox: HTMLElement | null = document.getElementById("resultBox");
    resultBox.appendChild(svg);
  }
  async function createMarkmap(markdown: string): any {
    const { Markmap, Transformer, loadCSS, loadJS } = window.markmap;
    const transformer = new Transformer();
    const { root, features } = transformer.transform(markdown);
    appendSvgToResultBox();
    return Markmap.create('#markmap', null, root);
  }
  async function toggleRsltFrmt() {
    const resultBox = document.getElementById('resultBox');
    isMarkdown = !isMarkdown;
    localStorage.setItem('is-markdown', String(isMarkdown));
    safelyRemoveChild("resultBox", "markmap");
    // update
    if (isMarkdown) {
      resultBox.innerHTML = resultMkdn;
    } else {
      await createMarkmap(resultMkdn);
    }
  };

  // ai

  async function goai() {
    // If you're using the API key input, we preference the key from there.
    const apiKeyFromDangerousApiKeyInput = document.body.querySelector('#openai_key_risky_but_cool')?.value;
    if (!apiKeyFromDangerousApiKeyInput) {
      alert('Please enter an OpenAI API key');
    }
    const userMsg = document.getElementById('input').value;
    let result = document.getElementById('resultBox');
    safelyRemoveChild("resultBox", "markmap");
    resultMkdn = await makeReal(
      userMsg,
      {
        apikey: apiKeyFromDangerousApiKeyInput,
        indent: indentKind,
        text: textKind,
        case: caseKind,
        whitespace: whiteSpaceKind,
      },
    );
    if (isMarkdown) {
      result.innerHTML = resultMkdn;
    } else {
      await createMarkmap(resultMkdn);
    }
  }

  async function submit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      goai();
    }
  }

  // Copy (markdown) Button

  async function svgToPngAndCopyToClipboard(svgElement, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // Create an image and set the SVG data as the source
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svgElement))));
      img.onload = () => {
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);
        // Convert canvas to PNG
        canvas.toBlob(async (blob) => {
          try {
            // Copy the PNG blob to the clipboard
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]).then(() => {
              if (blob) {
                console.debug('Semantict tree PNG copied to clipboard');
                copied();
              }
            })
            .catch(err => {
              console.error('Error in copying text: ', err);
            });
          } catch (err) {
            console.error('Could not copy PNG to clipboard', err);
          }
        }, 'image/png');
      };
  }
  function copyMkdnToClipBoard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (text.length > 0) {
          console.debug('Semantic tree Markdown copied to clipboard');
          copied();
        }
      })
      .catch(err => {
        console.error('Error in copying text: ', err);
      });
  }
  function copied() {
    const icon = document.getElementById('copyIcon');
    const copyIcon = isDark ? './img/icons/icons8-copy-30-dark.png' : './img/icons/icons8-copy-30-light.png';
    const checkImg = './img/icons/icons8-check-30.png';
    icon.src = checkImg;
    setTimeout(function() {
      icon.src = copyIcon;
    }, 2000);
  }
  function copy() {
    if (isMarkdown) {
      let semtree = document.getElementById('resultBox').innerHTML;
      copyMkdnToClipBoard(semtree);
    } else {
      const svgElement = document.getElementById('markmap');
      const width = 800;
      const height = 800;
      svgToPngAndCopyToClipboard(svgElement, width, height);
    }
  }

  // set the initial theme
  onMount(() => {
    const prefersDarkScheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedIsDark: string | null = localStorage.getItem('is-dark');
    isDark = (storedIsDark !== null) ? (storedIsDark === 'true') : prefersDarkScheme;
    // result format
    isMarkdown = (localStorage.getItem('is-markdown') === 'true');
    // mkdn format
    indentKind = localStorage.getItem('indent') ? localStorage.getItem('indent') : '2 spaces';
    textKind = localStorage.getItem('text') ? localStorage.getItem('text') : '[[wiki text]]';
    caseKind = localStorage.getItem('case') ? localStorage.getItem('case') : 'lower';
    whiteSpaceKind = localStorage.getItem('whitespace') ? localStorage.getItem('whitespace') : 'kabob-space';
    console.log('initial mkdn formatting: ', indentKind, textKind, caseKind, whiteSpaceKind);
    updateThemeElements();
  });
</script>

<svelte:window on:keydown={submit} />

<div class="font-sans mx-10">
  <!-- <div style="display: contents">%sveltekit.body%</div> -->
  <div class="container mx-auto p-4">
    <div class="flex items-center mb-2 p-10 justify-center sm:justify-start">
      <a href="https://github.com/wikibonsai/wikibonsai">
        <img id="wikibonsai-logo" alt="Logo" width="75px" height="60px" class="mr-4" src={logo}/>
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
      <button id="growButton"
              class="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg hover:bg-green-600"
              on:click={goai}>
        Grow
      </button>
    </div>
    <div class="flex justify-end items-center mb-4">
      <!-- About -->
      <button id="aboutButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              title="Format"
              on:click={toggleAbtMdl}>
        <img id="helpIcon" alt="Format" class="w-6 h-6" src={helpIcon}>
      </button>
      <!-- Format Markdown (toolbox) -->
      <button id="mkdnFormatButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              title="Format"
              on:click={toggleFrmtMdl}>
        <img id="mkdnFormatIcon" alt="Format" class="w-6 h-6" src={mkdnFormatIcon}>
      </button>
      <!-- Format Result -->
      <button id="resultFormatButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              on:click={toggleRsltFrmt}>
        <img id="resultFormatIcon" alt="Toggle Format" class="w-6 h-6" src={resultFormatIcon}>
      </button>
      <!-- Copy icon -->
      <button id="copyButton"
              class="rounded button-border hover:border-green-500 p-2 mr-2"
              title="Copy"
              on:click={copy}>
        <img id="copyIcon" alt="Copy" class="w-6 h-6" src={copyIcon}>
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
</div>
