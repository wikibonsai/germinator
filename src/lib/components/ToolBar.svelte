<script lang='ts'>
  import { onMount } from 'svelte';
  import { isMarkdown, resultMkdn, theme } from '$lib/util/store';
  import AboutButton from '$lib/components/AboutButton.svelte';
  import CopyButton from '$lib/components/CopyButton.svelte';
  import MkdnFrmtModal from "$lib/components/MkdnFrmtModal.svelte";

  // image sources based on theme color
  $: resultFormatIcon = $isMarkdown
                        ? `/img/icons/icons8-markdown-30-${$theme}.png`
                        : `/img/icons/icons8-mind-map-30-${$theme}.png`;
  $: mkdnFormatIcon   = `/img/icons/icons8-adjust-30-${$theme}.png`;

  onMount(() => {
    $isMarkdown = (localStorage.getItem('is-markdown') === 'true');
  });

  // modal

  let isFrmtMdlOpen: boolean = false;
  function toggleFrmtMdl(): void {
    isFrmtMdlOpen = !isFrmtMdlOpen;
  }

  // result format

  function toggleRsltFrmt() {
    $isMarkdown = !$isMarkdown;
    localStorage.setItem('is-markdown', String($isMarkdown));
  }
</script>

<div class="flex justify-end items-center mb-4">
  <AboutButton></AboutButton>
  <!-- Format Markdown -->
  <button id="mkdnFormatButton"
          class="toolbar-button"
          title="Markdown Format"
          on:click={toggleFrmtMdl}>
    <img id="mkdnFormatIcon" alt="Format" class="w-6 h-6" src={mkdnFormatIcon}>
  </button>
  <!-- Format Result -->
  <button id="resultFormatButton"
          class="toolbar-button"
          title="Result Format"
          on:click={toggleRsltFrmt}>
    <img id="resultFormatIcon" alt="Toggle Format" class="w-6 h-6" src={resultFormatIcon}>
  </button>
  <CopyButton markdown={$resultMkdn.all}></CopyButton>
</div>

<MkdnFrmtModal bind:isOpen={isFrmtMdlOpen}></MkdnFrmtModal>

<style>
  .toolbar-button {
    border-color: var(--accent-color-dark);
    border-radius: 0.25rem;
    border-width: 1px;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  .toolbar-button:hover {
    border-color: var(--accent-color-light);
  }
</style>
