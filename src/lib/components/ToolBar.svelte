<script lang='ts'>
  import { onMount } from 'svelte';
  import { isMarkdown, resultMkdn, resultMkmp, theme } from '$lib/util/store';
  import AboutModal from "$lib/components/AboutModal.svelte";
  import MkdnFrmtModal from "$lib/components/MkdnFrmtModal.svelte";

  let isCopied: boolean = false;

  // image sources based on theme color
  $: helpIcon         = `./img/icons/icons8-help-50-${$theme}.png`;
  $: resultFormatIcon = $isMarkdown
                        ? `./img/icons/icons8-markdown-30-${$theme}.png`
                        : `./img/icons/icons8-mind-map-30-${$theme}.png`;
  $: mkdnFormatIcon   = `./img/icons/icons8-adjust-30-${$theme}.png`;
  $: copyIcon         = isCopied
                        ? './img/icons/icons8-check-30.png'
                        : `./img/icons/icons8-copy-30-${$theme}.png`;

  onMount(() => {
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

  // result format

  function toggleRsltFrmt() {
    $isMarkdown = !$isMarkdown;
    localStorage.setItem('is-markdown', String($isMarkdown));
  }

  // copy (markdown) Button

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
      if ($resultMkmp !== null) {
        svgToPngAndCopyToClipboard($resultMkmp, width, height);
      }
    }
  }
</script>

<div class="flex justify-end items-center mb-4">
  <!-- About -->
  <button id="aboutButton"
          class="toolbar-button"
          title="Format"
          on:click={toggleAbtMdl}>
    <img id="helpIcon" alt="Format" class="w-6 h-6" src={helpIcon}>
  </button>
  <!-- Format Markdown -->
  <button id="mkdnFormatButton"
          class="toolbar-button"
          title="Format"
          on:click={toggleFrmtMdl}>
    <img id="mkdnFormatIcon" alt="Format" class="w-6 h-6" src={mkdnFormatIcon}>
  </button>
  <!-- Format Result -->
  <button id="resultFormatButton"
          class="toolbar-button"
          on:click={toggleRsltFrmt}>
    <img id="resultFormatIcon" alt="Toggle Format" class="w-6 h-6" src={resultFormatIcon}>
  </button>
  <!-- Copy icon -->
  <button id="copyButton"
          class="toolbar-button"
          title="Copy"
          on:click={copy}>
    <img id="copyIcon" alt="Copy" class="w-6 h-6" src={copyIcon}>
  </button>
</div>

<AboutModal bind:isOpen={isAbtMdlOpen}></AboutModal>
<MkdnFrmtModal bind:isOpen={isFrmtMdlOpen}></MkdnFrmtModal>

<style>
  .toolbar-button {
    border-color: var(--border-color);
    border-radius: 0.25rem;
    border-width: 1px;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }
  .toolbar-button:hover {
    border-color: var(--border-color-hover);
  }
</style>
