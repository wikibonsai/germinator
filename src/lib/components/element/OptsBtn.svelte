<script lang='ts'>
  import { isMarkdown, resultMkdn, theme } from '$lib/util/store';
  import OptionsModal from '$lib/components/component/OptionsModal.svelte';

  $: optsIcon   = `/img/icons/icons8-adjust-30-${$theme}.png`;

  let isFrmtMdlOpen: boolean = false;
  function toggleOptsMdl(): void {
    isFrmtMdlOpen = !isFrmtMdlOpen;
  }
</script>

<button id="mkdnFormatButton"
        class="util-btn"
        title="Options"
        on:click={toggleOptsMdl}>
  <img id="optsIcon" alt="Format" class="w-6 h-6" src={optsIcon}>
</button>

<OptionsModal bind:isOpen={isFrmtMdlOpen}></OptionsModal>
