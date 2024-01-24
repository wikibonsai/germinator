<script lang='ts'>
  import { theme } from '$lib/util/store';
  import AboutModal from "$lib/components/AboutModal.svelte";

  $: helpIcon         = `/img/icons/icons8-help-50-${$theme}.png`;

  let isAbtMdlOpen: boolean = false;
  function toggleAbtMdl(): void {
    isAbtMdlOpen = !isAbtMdlOpen;
  }
</script>

<button id="aboutButton"
        class="toolbar-button"
        title="About"
        on:click={toggleAbtMdl}>
  <img id="helpIcon" alt="Format" class="w-6 h-6" src={helpIcon}>
</button>

<AboutModal bind:isOpen={isAbtMdlOpen}></AboutModal>

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
