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

<div class="modal about-modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
     class:opacity-0={!isOpen}
     class:pointer-events-none={!isOpen}
     class:modal-active={isOpen}>
  <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
  <div class="modal-container w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="modal-content py-4 text-left px-6">
      <!--Title-->
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl font-bold">Markdown Formatting</p>
        <button class="about-modal-close cursor-pointer z-50" on:click={closeModal}>
          <svg class="title-color fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M16.292 2.292l-1.584-1.584-6.708 6.708-6.708-6.708-1.584 1.584 6.708 6.708-6.708 6.708 1.584 1.584 6.708-6.708 6.708 6.708 1.584-1.584-6.708-6.708z"></path>
          </svg>
        </button>
      </div>
      <!--Body-->
      <!-- todo: bind:group? https://svelte.dev/docs/element-directives#bind-group -->
      <form class="space-y-4">
        <div class="dropdown-container">
          <!-- Indent Dropdown -->
          <div class="dropdown-label">
            <span>Indent</span>
            <select id="indentSelect"
                    class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={$mkdnFrmt.indentKind}>
              <option value="2 spaces">2 spaces</option>
              <option value="4 spaces">4 spaces</option>
              <option value="1 tab">1 tab</option>
            </select>
          </div>
          <!-- Format Dropdown -->
          <div class="dropdown-label">
            <span>Wiki</span>
            <select id="wikiSelect"
                    class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={$mkdnFrmt.textKind}>
              <option value="plain-text">plain-text</option>
              <option value="[[wikitext]]">[[wikitext]]</option>
            </select>
          </div>
          <!-- Case Dropdown -->
          <div class="dropdown-label">
            <span>Case</span>
            <select id="caseSelect"
                    class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={$mkdnFrmt.caseKind}>
              <option value="upper">Upper Case</option>
              <option value="lower">lower case</option>
            </select>
          </div>
          <!-- Whitespace Dropdown -->
          <div class="dropdown-label">
            <span>Whitespace</span>
            <select id="whitespaceSelect"
                    class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={$mkdnFrmt.whiteSpaceKind}>
              <option value=" ">white space</option>
              <option value="-">kabob-space</option>
              <option value="_">snake_space</option>
            </select>
          </div>
        </div>
      </form>
      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button id="saveButton"
                class="px-4 bg-green-500 p-3 rounded-lg text-white hover:bg-green-600"
                on:click={saveMkdnFrmt}>
          Save
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .title-color {
    color: var(--text-color);
  }

  .dropdown-container {
    display: flex;
    flex-direction: column;
    max-width: 300px; /* Adjust the max-width as needed */
  }

  .dropdown-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .dropdown-label span {
    margin-right: 1rem;
    min-width: 80px; /* Ensure all labels have the same width */
  }
</style>
