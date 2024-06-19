<script lang='ts'>
  import { userConcept } from '$lib/util/store';
  import ShareIcon from '../icons/ShareIcon.svelte';

  function share() {
    if ($userConcept.length > 0) {
      const baseUrl: string = window.location.origin + window.location.pathname;
      const shareableUrl: string = `${baseUrl}?query=${encodeURIComponent($userConcept)}`;
      navigator.clipboard.writeText(shareableUrl)
        .then(() => {
          alert('Shareable URL copied to clipboard');
        })
        .catch((err) => {
          alert('Failed to copy shareable URL: ', err);
        });
    }
  }
</script>

<button id="shareButton"
        class="util-btn"
        title="Share"
        on:click={share}>
  <ShareIcon class="w-6 h-6" />
</button>
