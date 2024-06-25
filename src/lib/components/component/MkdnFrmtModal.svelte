<script lang='ts'>
  import { onMount } from 'svelte';
  import { mkdnFrmt } from '$lib/util/store';

  export let isOpen: boolean = false;

  onMount(() => {
    // mkdn format
    $mkdnFrmt.indentKind = localStorage.getItem('indent')
                         ? localStorage.getItem('indent')
                         : '2 spaces';
    $mkdnFrmt.textKind = localStorage.getItem('text')
                       ? localStorage.getItem('text')
                       : '[[wiki text]]';
    $mkdnFrmt.caseKind = localStorage.getItem('case')
                       ? localStorage.getItem('case')
                       : 'lower';
    $mkdnFrmt.whiteSpaceKind = localStorage.getItem('whitespace')
                             ? localStorage.getItem('whitespace')
                             : 'kabob-space';
    $mkdnFrmt.attrKind = localStorage.getItem('attrs')
                       ? localStorage.getItem('attrs')
                       : 'caml';
    console.debug('initial mkdn formatting: ', $mkdnFrmt, $mkdnFrmt.indentKind, $mkdnFrmt.textKind, $mkdnFrmt.caseKind, $mkdnFrmt.whiteSpaceKind);
  });

  function closeModal(): void {
    isOpen = false;
  }

  function toggleModal(): void {
    isOpen = !isOpen;
  }

  function saveMkdnFrmt(): void {
    localStorage.setItem('indent', $mkdnFrmt.indentKind);
    localStorage.setItem('text', $mkdnFrmt.textKind);
    localStorage.setItem('case', $mkdnFrmt.caseKind);
    localStorage.setItem('whitespace', $mkdnFrmt.whiteSpaceKind);
    localStorage.setItem('attrs', $mkdnFrmt.attrKind);
    console.debug('updated mkdn formatting: ', $mkdnFrmt, $mkdnFrmt.indentKind, $mkdnFrmt.textKind, $mkdnFrmt.caseKind, $mkdnFrmt.whiteSpaceKind);
    toggleModal();
  };

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isOpen) {
      toggleModal();
    }
  }
</script>


<svelte:window on:keydown={handleKeydown} />

<div class="modal" class:modal-open={isOpen}>
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="modal-close" on:click={closeModal}>
      <svg class="btn-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path d="M16.292 2.292l-1.584-1.584-6.708 6.708-6.708-6.708-1.584 1.584 6.708 6.708-6.708 6.708 1.584 1.584 6.708-6.708 6.708 6.708 1.584-1.584-6.708-6.708z"></path>
      </svg>
    </button>
    <p class="modal-title">Markdown Formatting</p>
    <div class="modal-body">
      <form class="dropdown-container">
        <!-- Indent Dropdown -->
        <div class="dropdown-label">
          <span>Indent</span>
          <select id="indentSelect" bind:value={$mkdnFrmt.indentKind}>
            <option value="2 spaces">2 spaces</option>
            <option value="4 spaces">4 spaces</option>
            <option value="1 tab">1 tab</option>
          </select>
        </div>
        <!-- Format Dropdown -->
        <div class="dropdown-label">
          <span>Wiki</span>
          <select id="wikiSelect" bind:value={$mkdnFrmt.textKind}>
            <option value="plain-text">plain-text</option>
            <option value="[[wikitext]]">[[wikitext]]</option>
          </select>
        </div>
        <!-- Case Dropdown -->
        <div class="dropdown-label">
          <span>Case</span>
          <select id="caseSelect" bind:value={$mkdnFrmt.caseKind}>
            <option value="upper">Upper Case</option>
            <option value="lower">lower case</option>
          </select>
        </div>
        <!-- Whitespace Dropdown -->
        <div class="dropdown-label">
          <span>Whitespace</span>
          <select id="whitespaceSelect" bind:value={$mkdnFrmt.whiteSpaceKind}>
            <option value=" ">white space</option>
            <option value="-">kabob-space</option>
            <option value="_">snake_space</option>
          </select>
        </div>
        <!-- Attributes Dropdown -->
        <div class="dropdown-label">
          <span>Attributes</span>
          <select id="attrSelect" bind:value={$mkdnFrmt.attrKind}>
            <option value="caml">CAML</option>
            <option value="yaml">YAML</option>
          </select>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="modal-button" on:click={saveMkdnFrmt}>
        Save
      </button>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 500;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .modal-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .modal-open {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #1f2937;
    opacity: 0.5;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    text-align: center;
  }

  .modal-button {
    background-color: var(--hover-color);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-button:hover {
    background-color: var(--hover-color);
  }

  .dropdown-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .dropdown-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .dropdown-label span {
    margin-right: 1rem;
    min-width: 80px;
  }

  select {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    background-color: var(--box-background);
    color: var(--text-color);
  }
</style>
