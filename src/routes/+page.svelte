<script lang='ts'>
  import { onMount, tick } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';
  import { resultMkdn, theme } from '$lib/util/store';
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  import ApiKey from "$lib/components/APIKey.svelte";
  import AboutModal from "$lib/components/AboutModal.svelte";
  import Header from "$lib/components/Header.svelte";
  import MkdnFrmtModal from "$lib/components/MkdnFrmtModal.svelte";
  import Search from "$lib/components/Search.svelte";

  // loading
  let loading: boolean = false;
  // result format
  let isMarkdown: Writable<boolean> = writable(true);
  let resultMkmp: any = null;

  // copied
  let isCopied: boolean = false;

  // image sources based on theme color
  $: helpIcon         = `./img/icons/icons8-help-50-${$theme}.png`;
  $: resultFormatIcon = $isMarkdown
                        ? `./img/icons/icons8-markdown-30-${$theme}.png`
                        : `./img/icons/icons8-mind-map-30-${$theme}.png`;
  $: mkdnFormatIcon   = `./img/icons/icons8-adjust-30-${$theme}.png`;
  // copy
  $: copyIcon         = isCopied
                        ? './img/icons/icons8-check-30.png'
                        : `./img/icons/icons8-copy-30-${$theme}.png`;

  onMount(() => {
    // result format
    $isMarkdown = (localStorage.getItem('is-markdown') === 'true');
  });

  // modals

  let isAbtMdlOpen: boolean = false;
  function toggleAbtMdl(): void {
    isAbtMdlOpen = !isAbtMdlOpen;
  }

  let isFrmtMdlOpen: boolean = false;
  function toggleFrmtMdl(): void {
    isFrmtMdlOpen = !isFrmtMdlOpen;
  }

  // loading

  function load(event: CustomEvent<boolean>) {
    loading = event.detail;
  }

  // result format

  async function toggleRsltFrmt() {
    $isMarkdown = !$isMarkdown;
    localStorage.setItem('is-markdown', String($isMarkdown));
    generateMarkmap();
  }

  // markmap svg handling

  // very helpful: https://svelte.dev/repl/9499dbcf3f3240e4af42e38ab19cc9ea?version=3.47.0
  async function generateMarkmap(): Promise<any> {
    if (!$isMarkdown) {
      // wait for the DOM to update
      await tick();
      // generate markmap
      const transformer = new Transformer();
      const { root, features } = transformer.transform(resultMkdn);
      // styling
      // const { styles, scripts } = transformer.getUsedAssets(features);
      // if (styles) loadCSS(styles);
      // if (scripts) loadJS(scripts, { getMarkmap: () => Markmap });
      // options
      // const options = {
      //   //style: id => 'div{padding-bottom:0.25em!important} g g:last-of-type div{font-weight:bold; font-size:18px} foreignObject{overflow:visible!important; transform:translateX(-1%)} g g:last-of-type rect {transform:scaleX(125%) translateX(-3%)}',
      //   //style: id => 'div{padding-bottom:0.3em!important} g g:last-of-type div{font-weight:bold;} foreignObject{overflow:visible!important; transform:translateX(-1%)}',
      //   duration:0,
      //   style: id => 'div{padding-bottom:0.12em!important}',
      //   spacingVertical: 8, // 5
      //   //spacingHorizontal: 100,
      //   paddingX:15, // 8
      // }
      // go
      clearSVG();
      Markmap.create('#markmap', undefined, root);
    }
  }

  function clearSVG() {
    while (resultMkmp && resultMkmp.firstChild) {
      resultMkmp.removeChild(resultMkmp.firstChild);
    }
  }

  // ai

  async function goai() {
    loading = true;
    resultMkdn = '';
    if (!apiKey) { alert('Please enter an OpenAI API key'); return; }
    resultMkdn = await makeReal(
      userMsg,
      {
        apikey: apiKey,
        indent: indentKind,
        text: textKind,
        case: caseKind,
        whitespace: whiteSpaceKind,
      },
    );
    await generateMarkmap();
    loading = false;
  }

  async function submit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      goai();
    }
  }

  // Copy (markdown) Button

  async function svgToPngAndCopyToClipboard(svgElement: SVGElement, width: number, height: number): void {
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

  function copyMkdnToClipBoard(text: string): void {
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

  function copied(): void {
    isCopied = true;
    setTimeout(function() {
      isCopied = false;
    }, 2000);
  }

  function copy(): void {
    if ($isMarkdown) {
      copyMkdnToClipBoard($resultMkdn);
    } else {
      const width = 800;
      const height = 800;
      svgToPngAndCopyToClipboard(resultMkmp, width, height);
    }
  }
</script>

<div class="font-sans mx-10">
  <div class="container mx-auto p-4">
    <Header></Header>
    <Search on:loading={load}></Search>
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
    {#if loading}
      <!-- loader -->
      <div id="loader" class="sprout-loader">
        <div class="sprout"></div>
        <div class="leaf left"></div>
        <div class="leaf right"></div>
      </div>
    {/if}
    <!-- results -->
    <div class="result-box whitespace-pre-wrap bg-white text-black input-border p-4 mb-10 rounded-lg"
          style="display: {($resultMkdn === '') ? 'none' : 'flex'}">
      {#if $isMarkdown}
        {@html $resultMkdn}
      {:else}
        <svg id="markmap"
             style="width: 800px; height: 800px"
             bind:this={resultMkmp}
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
        </svg>
      {/if}
    </div>
  </div>

  <ApiKey></ApiKey>

  <AboutModal bind:isOpen={isAbtMdlOpen}></AboutModal>
  <MkdnFrmtModal bind:isOpen={isFrmtMdlOpen}></MkdnFrmtModal>
</div>
