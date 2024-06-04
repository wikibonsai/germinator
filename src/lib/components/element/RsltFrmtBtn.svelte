<script>
  import { onMount } from 'svelte';
  import { isMarkdown, resultMkdn, theme } from '$lib/util/store';

  $: resultFormatIcon = $isMarkdown
                        ? `/img/icons/icons8-mind-map-30-${$theme}.png`
                        : `/img/icons/icons8-markdown-30-${$theme}.png`;

  onMount(() => {
    $isMarkdown = (localStorage.getItem('is-markdown') === 'true');
  });

  function toggleRsltFrmt() {
    $isMarkdown = !$isMarkdown;
    localStorage.setItem('is-markdown', String($isMarkdown));
  }
</script>

<button id="resultFormatButton"
        class="util-btn"
        title="Result Format"
        on:click={toggleRsltFrmt}>
        <img id="resultFormatIcon" alt="Toggle Format" class="w-6 h-6" src={resultFormatIcon}>
</button>
