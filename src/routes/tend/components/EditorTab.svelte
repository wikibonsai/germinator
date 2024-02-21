<script lang="ts">
  import { updateFname } from '$lib/util/store';

  export let docId: string;
  export let isActive: boolean;
  export let filename: string;
  export let onTabClick: () => void;
  export let onRemoveClick: (event: MouseEvent) => void;
  export let onDragStart: (event: DragEvent, docId: string) => void;

  function handleFilenameChange(event: Event) {
    const newFname = (event.target as HTMLInputElement).value;
    updateFname(docId, newFname);
  }
</script>

<button class="tab {isActive ? 'active' : ''}"
        draggable="true"
        on:click={onTabClick}
        on:dragstart={(event) => onDragStart(event, docId)}>
  {#if isActive}
    <input class="filename-input"
           bind:value={filename}
           on:input={(event) => handleFilenameChange(event)} />
  {:else}
    <span>{filename}</span>
  {/if}
  <button class="remove-tab-btn" on:click={(event) => onRemoveClick(event)}>
    ✖
  </button>
</button>

<style>
  .tab {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 2px;
    background-color: var(--background-accent-color);
    border: 1px solid var(--text-color);
    border-bottom: none;
  }

  .tab.active {
    background-color: var(--accent-color-dark);
    font-weight: bold;
  }

  .remove-tab-btn {
    color: red;
  }

  /* filename editing */

  .filename-input {
    background-color: transparent;
    border: none;
    color: inherit;
    width: auto;
    font-size: inherit;
    cursor: text;
  }

  .filename-input:focus {
    outline: none;
    background-color: var(--background-accent-color);
  }
</style>
