<script lang='ts'>
  import { onDestroy, onMount } from 'svelte';
  import { EditorNode } from '$lib/util/multiplex';
  import { documents, editorTree, indicatorTabLoc, updateFname, updateMkdn } from '$lib/util/store';
  import EditorTab from './EditorTab.svelte';

  // data
  export let node: EditorNode;
  let activeDocId = node.activeDocId;
  let localFname: string = '';
  let localMkdn: string = '';
  // gui
  let tabsContainer: HTMLDivElement;

  $: activeDocId = node.activeDocId;
  $: if ($documents[activeDocId]) {
    localFname = $documents[activeDocId].filename;
    localMkdn = $documents[activeDocId].mkdn;
  }

  onMount(() => {
    const docData = $documents[node.activeDocId];
    if (docData) {
      localFname = docData.filename;
      localMkdn = docData.mkdn;
    } else {
      warn(node.activeDocId);
    }
  });

  function warn(docId: string) {
    console.warn('no document found for ', docId);
    localFname = 'Untitled';
    localMkdn = '';
  }

  // content

  function saveFname() {
    updateFname(node.activeDocId, localFname);
  }

  function saveMkdn() {
    updateMkdn(node.activeDocId, localMkdn);
  }

  // editor

  function closeEditor() {
    editorTree.rmNode(node.id);
  }

  // split

  function handleSplit(direction: 'horizontal' | 'vertical'): void {
    editorTree.splitNode(node.id, direction);
  }

  function splitHorizontal() {
    handleSplit('horizontal');
  }

  function splitVertical() {
    handleSplit('vertical');
  }

  // drag

  function dragTabStart(event: DragEvent, docId: string) {
    event.dataTransfer.setData('application/json', JSON.stringify({ editorId: node.id, docId: docId }));
    event.dataTransfer.effectAllowed = 'move';
    indicatorTabLoc.set({
      visible: true,
      draggedDocId: docId,
      closestEditorId: node.id,
      position: 0,
    });
  }

  function dragTabOver(event: DragEvent) {
    event.preventDefault();
    const bounds = tabsContainer.getBoundingClientRect();
    indicatorTabLoc.update((state) => ({
      ...state,
      closestEditorId: node.id,
      position: event.clientX - bounds.left,
    }));
  }

  function dropTab(event: DragEvent) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    const dropX = event.clientX;
    const tabs = tabsContainer.querySelectorAll('.tab');
    let closestTabIdx = -1;
    let minDistance = Infinity;
    tabs.forEach((tab, idx) => {
      const rect = tab.getBoundingClientRect();
      const distanceToLeft: number = Math.abs(dropX - rect.left);
      const distanceToRight: number = Math.abs(dropX - rect.right);
      const distance = Math.min(distanceToLeft, distanceToRight);
      if (distance < minDistance) {
          closestTabIdx = idx + (dropX > (rect.left + rect.right) / 2 ? 1 : 0);
          minDistance = distance;
      }
    });
    if (closestTabIdx !== -1) {
      if (data.editorId === node.id) {
        editorTree.moveTabWithinEditor(node.id, data.docId, closestTabIdx);
      } else {
        editorTree.moveTabAcrossEditors(data.editorId, node.id, data.docId, closestTabIdx);
      }
    }
    indicatorTabLoc.update(state => ({
      ...state,
      visible: false,
      draggedDocId: '',
      closestEditorId: node.id,
      indicatorPosition: event.clientX - tabsContainer.getBoundingClientRect().left
    }));
  }

  // tabs

  function updateActiveTab(docId: string): void {
    editorTree.setActiveTab(node.id, docId);
  }

  function addTab(): void {
    editorTree.addTab(node.id);
  }

  function rmTab(event: DragEvent, docId: string): void {
    event.stopPropagation();
    editorTree.rmTab(node.id, docId);
    // if removed tab was active, update active tab
    if (docId === activeDocId) {
      const newActiveDocId = node.docIds.length > 0 ? node.docIds[0] : null;
      if (newActiveDocId !== null) {
        activeDocId = newActiveDocId;
        editorTree.setActiveTab(node.id, newActiveDocId);
      }
    }
  }
</script>

<div class="editor-container">
  <div class="tabs-header-container">
    <div class="tabs"
         bind:this={tabsContainer}
         on:drop={(event) => dropTab(event)}
         on:dragover={(event) => dragTabOver(event)}
         role="listbox"
         tabindex="0"
         aria-label="Drop target for tabs">
      {#each node.docIds as docId (docId)}
      <EditorTab docId={docId}
                 filename={$documents[docId].filename}
                 isActive={activeDocId === docId}
                 onTabClick={() => updateActiveTab(docId)}
                 onRemoveClick={(event) => rmTab(event, docId)}
                 onDragStart={(event, docId) => dragTabStart(event, docId)} />
      {/each}
      {#if $indicatorTabLoc.visible && $indicatorTabLoc.closestEditorId === node.id}
        <div class="insertion-indicator" style="left: {$indicatorTabLoc.position}px;"></div>
      {/if}
      <button class="add-tab-btn" on:click={addTab}>+</button>
      <div class="editor-controls">
        <button class="split-horiz img-btn" on:click={splitHorizontal}>↕️</button>
        <button class="split-vert img-btn" on:click={splitVertical}>↔️</button>
        <button class="close-btn img-btn" on:click={() => closeEditor()}>✕</button>
      </div>
    </div>
  </div>
  <div class="markdown-editor">
    {#if $documents[node.activeDocId]}
      <textarea bind:value={$documents[node.activeDocId].mkdn} on:blur={() => saveMkdn()}></textarea>
    {/if}
  </div>
</div>

<style>
  .close-btn {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
    color: var(--text-color);
  }

  /* editor */

  .editor-container {
    border: 1px var(--accent-color-light) solid;
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* overflow: hidden; */
    position: relative;
    overflow: auto;
  }

  .editor-controls {
    display: flex;
    align-items: center;
  }

  .markdown-editor {
    flex: 1;
    overflow: auto;
    height: 100%;
    display: flex;
  }

  .markdown-editor textarea {
    background-color: var(--background-accent-color);
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: none;
    resize: none;
    flex-grow: 1;
  }

  /* tabs */

  .insertion-indicator {
    position: absolute;
    bottom: 0;
    width: 2px;
    height: 20px;
    background-color: var(--hover-color);
    transition: left 0.2s ease-in-out; 
  }

  .tabs {
    background-color: var(--accent-color-light);
    display: flex;
    position: relative;
  }

  .tabs-header-container {
    display: flex;
    align-items: center;
  }
</style>
