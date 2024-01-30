<script lang='ts'>
  import { theme } from '$lib/util/store';
  import AbtModal from "$lib/components/component/AbtModal.svelte";

  $: helpIcon         = `/img/icons/icons8-help-50-${$theme}.png`;

  let isAbtMdlOpen: boolean = false;
  function toggleAbtMdl(): void {
    isAbtMdlOpen = !isAbtMdlOpen;
  }
</script>

<button id="aboutButton"
        class="util-btn"
        title="About"
        on:click={toggleAbtMdl}>
  <img id="helpIcon" alt="Format" class="w-6 h-6" src={helpIcon}>
</button>

<AbtModal bind:isOpen={isAbtMdlOpen}></AbtModal>
