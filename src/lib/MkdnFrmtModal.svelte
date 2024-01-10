<script lang='ts'>
  export let isOpen: boolean = false;

  function toggleModal(): void {
    isOpen = !isOpen;
  }

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
  <!-- Modal content -->
  <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

  <div class="modal-container w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="modal-content py-4 text-left px-6">
      <!--Title-->
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl font-bold">Markdown Formatting</p>
        <div class="about-modal-close cursor-pointer z-50" on:click={() => isOpen = false}>
          <svg class="fill-current" styles="color: var(--text-color);" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M16.292 2.292l-1.584-1.584-6.708 6.708-6.708-6.708-1.584 1.584 6.708 6.708-6.708 6.708 1.584 1.584 6.708-6.708 6.708 6.708 1.584-1.584-6.708-6.708z"></path>
          </svg>
        </div>
      </div>
      <!--Body-->
      <form id="toolboxForm" class="space-y-4">
        <div class="dropdown-container">
          <!-- Indent Dropdown -->
          <div class="dropdown-label">
            <span>Indent</span>
            <select id="indentSelect" class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="2 spaces">2 spaces</option>
              <option value="4 spaces">4 spaces</option>
              <option value="1 tab">1 tab</option>
            </select>
          </div>
          <!-- Format Dropdown -->
          <div class="dropdown-label">
            <span>Wiki</span>
            <select id="wikiSelect" class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="regular text">regular text</option>
              <option value="[[wiki text]]">[[wiki text]]</option>
            </select>
          </div>
          <!-- Case Dropdown -->
          <div class="dropdown-label">
            <span>Case</span>
            <select id="caseSelect" class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="upper">Upper Case</option>
              <option value="lower">lower case</option>
            </select>
          </div>
          <!-- Whitespace Dropdown -->
          <div class="dropdown-label">
            <span>Whitespace</span>
            <select id="whitespaceSelect" class="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
                on:click={toggleModal}>
          Save
        </button>
      </div>

    </div>
  </div>
</div>

