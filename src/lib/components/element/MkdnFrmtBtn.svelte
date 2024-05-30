<script lang='ts'>
  import { isMarkdown, resultMkdn, theme } from '$lib/util/store';
  import MkdnFrmtModal from '$lib/components/component/MkdnFrmtModal.svelte';

  $: mkdnFormatIcon   = `/img/icons/icons8-adjust-30-${$theme}.png`;

  let isFrmtMdlOpen: boolean = false;
  function toggleFrmtMdl(): void {
    isFrmtMdlOpen = !isFrmtMdlOpen;
  }
</script>

<button id="mkdnFormatButton"
        class="util-btn"
        title="Markdown Format"
        on:click={toggleFrmtMdl}>
  <img id="mkdnFormatIcon" alt="Format" class="w-6 h-6" src={mkdnFormatIcon}>
</button>

<MkdnFrmtModal bind:isOpen={isFrmtMdlOpen}></MkdnFrmtModal>
