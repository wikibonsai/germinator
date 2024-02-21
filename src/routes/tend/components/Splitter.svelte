<script lang='ts'>
  import { editorTree } from '$lib/util/store';
  import { EditorNode } from '$lib/util/multiplex';
  import Editor from './Editor.svelte';
  
  export let node: EditorNode;
</script>

<div class={`split ${node.splitDirection}`}>
  {#each node.children as childNode (childNode.id)}
    {#if childNode.type === 'editor'}
      <Editor node={childNode} />
    {:else}
      <!-- from: https://svelte.dev/repl/3b32cfb5331843b286f02e2bb28a294a?version=4.2.10 -->
      <!-- <svelte:self bind:this={component} outer={false}/> -->
      <svelte:self node={childNode}/>
    {/if}
  {/each}
</div>

<style>
  .split {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .horizontal {
    flex-direction: column;
  }

  .vertical {
    flex-direction: row;
  }
</style>
