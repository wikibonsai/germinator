<script lang='ts'>
  import * as htmlToImage from 'html-to-image';
  import { isMarkdown, theme } from '$lib/util/store';

  export let markdown: string = '';
  export let svg: SVGElement | null = null;
  let isCopied: boolean = false;

  $: copyIcon           = isCopied
                          ? '/img/icons/icons8-check-30.png'
                          : `/img/icons/icons8-copy-30-${$theme}.png`;

  function copied(): void {
    isCopied = true;
    setTimeout(function() {
      isCopied = false;
    }, 2000);
  }

  function copy(): void {
    if ($isMarkdown) {
      copyMkdnToClipBoard(markdown);
    } else {
      elementToImageAndCopyToClipboard(document.getElementById('result') as HTMLElement);
    }
  }

  async function elementToImageAndCopyToClipboard(element: HTMLElement): Promise<void> {
    try {
      ////
      // full result box
      // capture the element as a Blob
      const blob = await htmlToImage.toBlob(element, {
        backgroundColor: 'transparent',
      });
      ////
      // graphs only
      // find the graphs if they exist
      // const graphElement = element.querySelector('.markmap svg, .word-atom-map svg, .branch-map svg');
      // // Capture the element as a Blob
      // const blob = await htmlToImage.toBlob(graphElement, {
      //   backgroundColor: 'transparent',
      // });
      // copy the Blob to the clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
      copied();
    } catch (err) {
      console.error('Could not capture element as image', err);
    }
  }

  function copyMkdnToClipBoard(text: string): void {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (text.length > 0) {
          console.debug('Markdown copied to clipboard');
          copied();
        }
      })
      .catch(err => {
        console.error('Error in copying text: ', err);
      });
  }
</script>

<button id="copyButton"
        class="util-btn"
        title="Copy"
        on:click={copy}>
  <img id="copyIcon" alt="Copy" class="w-6 h-6" src={copyIcon}>
</button>
