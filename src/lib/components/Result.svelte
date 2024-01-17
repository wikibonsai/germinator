<script lang='ts'>
  import { isMarkdown, resultMkdn, resultMkmp } from '$lib/util/store';
  import MarkMap from '$lib/components/MarkMap.svelte';
</script>

<!-- ancestry -->
<div class="flex whitespace-pre-wrap box-border bg-white text-black p-4 mb-10 rounded-lg"
     style="display: {($resultMkdn.ancestors === '') ? 'none' : 'flex'}">
  {@html $resultMkdn.ancestors}
</div>
<!-- atom -->
<div class="flex whitespace-pre-wrap box-border bg-white text-black p-4 mb-10 rounded-lg"
     style="display: {($resultMkdn.atom === '') ? 'none' : 'flex'}">
  {@html $resultMkdn.atom}
</div>
<!-- subtree -->
<div class="flex whitespace-pre-wrap box-border bg-white text-black p-4 mb-10 rounded-lg"
     style="display: {($resultMkdn.descendants === '') ? 'none' : 'flex'}">
  {#if $isMarkdown}
    {@html $resultMkdn.descendants}
  {:else}
    <MarkMap markdown={$resultMkdn.descendants} bind:markmap={$resultMkmp}></MarkMap>
  {/if}
</div>
