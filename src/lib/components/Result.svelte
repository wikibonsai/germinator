<script lang='ts'>
  import { isMarkdown, resultMkdn, resultMkmp } from '$lib/util/store';
  import MarkMap from '$lib/components/MarkMap.svelte';
</script>

<!-- ancestry -->
<div class="result-box box-border"
     style="display: {($resultMkdn.ancestors === '') ? 'none' : 'flex'}">
  {@html $resultMkdn.ancestors}
</div>
<!-- atom -->
<div class="result-box box-border"
     style="display: {($resultMkdn.atom === '') ? 'none' : 'flex'}">
  {@html $resultMkdn.atom}
</div>
<!-- subtree -->
<div class="result-box box-border"
     style="display: {($resultMkdn.descendants === '') ? 'none' : 'flex'}">
  {#if $isMarkdown}
    {@html $resultMkdn.descendants}
  {:else}
    <MarkMap markdown={$resultMkdn.descendants} bind:markmap={$resultMkmp}></MarkMap>
  {/if}
</div>

<style>
  .result-box {
    display: flex;
    white-space: pre-wrap;
    background-color: var(--box-background);
    color: var(--text-color);
    border-radius: 0.5rem;
    margin-bottom: 2.5rem;
    padding: 1rem;
  }
</style>
