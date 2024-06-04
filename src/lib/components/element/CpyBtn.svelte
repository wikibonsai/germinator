<script lang='ts'>
  import html2canvas from 'html2canvas';
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
      // capture the element as a canvas
      const canvas = await html2canvas(element, {
        backgroundColor: 'transparent',
      });
      // convert the canvas to a PNG blob
      canvas.toBlob(async (blob) => {
        try {
          // copy the PNG blob to the clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          copied();
        } catch (err) {
          console.error('Could not copy PNG to clipboard', err);
        }
      }, 'image/png');
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
