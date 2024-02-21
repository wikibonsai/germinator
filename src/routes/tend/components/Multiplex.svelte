<script lang='ts'>
  import { editorTree } from '$lib/util/store';
  import Editor from './Editor.svelte';
  import Splitter from './Splitter.svelte';
</script>

{#each $editorTree.children as node (node.id)}
  {#if node.type === 'editor'}
    <Editor node={node} />
  {:else}
    <Splitter node={node} />
  {/if}
{/each}
