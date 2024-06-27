<script lang='ts'>
  import { onMount } from 'svelte';
  import { llm, mkdnFrmt, systemApiKeys } from '$lib/util/store';
  import { DEFAULT_MODEL_ANTHROPIC, DEFAULT_MODEL_OPENAI } from '$lib/util/const';

  export let isOpen: boolean = false;

  let activeTab = 'markdown';
  const imgSrc: string = '/img/icons/icons8-help-50.png';

  onMount(() => {
    // llm options
    $llm.provider = localStorage.getItem('provider')
              ? localStorage.getItem('provider')
              : 'anthropic';
    $llm.anthropic.model = localStorage.getItem('model-anthropic')
              ? localStorage.getItem('model-anthropic')
              : DEFAULT_MODEL_ANTHROPIC;
    $llm.openai.model = localStorage.getItem('model-openai')
              ? localStorage.getItem('model-openai')
              : DEFAULT_MODEL_OPENAI;
    if ($systemApiKeys.anthropic === '') {
      $llm.anthropic.apiKey = localStorage.getItem('api-key-anthropic')
                            ? localStorage.getItem('api-key-anthropic')
                            : '';
    }
    if ($systemApiKeys.openai === '') {
      $llm.openai.apiKey = localStorage.getItem('api-key-openai')
                      ? localStorage.getItem('api-key-openai')
                      : '';
    }
    // mkdn format
    $mkdnFrmt.indentKind = localStorage.getItem('indent')
                         ? localStorage.getItem('indent')
                         : '2 spaces';
    $mkdnFrmt.textKind = localStorage.getItem('text')
                       ? localStorage.getItem('text')
                       : '[[wikitext]]';
    $mkdnFrmt.caseKind = localStorage.getItem('case')
                       ? localStorage.getItem('case')
                       : 'lower';
    $mkdnFrmt.whiteSpaceKind = localStorage.getItem('whitespace')
                             ? localStorage.getItem('whitespace')
                             : 'kabob-space';
    $mkdnFrmt.attrKind = localStorage.getItem('attrs')
                       ? localStorage.getItem('attrs')
                       : 'caml';
    // console.debug('initial mkdn formatting: ', $mkdnFrmt, $mkdnFrmt.indentKind, $mkdnFrmt.textKind, $mkdnFrmt.caseKind, $mkdnFrmt.whiteSpaceKind);
  });

  // modal

  function closeModal(): void {
    isOpen = false;
  }

  function toggleModal(): void {
    isOpen = !isOpen;
  }

  function saveOpts(): void {
    // llm
    localStorage.setItem('provider', $llm.provider);
    const provider: string = $llm.provider;
    localStorage.setItem('model', $llm[provider].model);
    // todo: if loaded from server, skip
    localStorage.setItem('api-key-anthropic', $llm[provider].apiKey);
    localStorage.setItem('api-key-openai', $llm[provider].apiKey);
    // mkdn
    localStorage.setItem('indent', $mkdnFrmt.indentKind);
    localStorage.setItem('text', $mkdnFrmt.textKind);
    localStorage.setItem('case', $mkdnFrmt.caseKind);
    localStorage.setItem('whitespace', $mkdnFrmt.whiteSpaceKind);
    localStorage.setItem('attrs', $mkdnFrmt.attrKind);
    // console.debug('updated mkdn formatting: ', $mkdnFrmt, $mkdnFrmt.indentKind, $mkdnFrmt.textKind, $mkdnFrmt.caseKind, $mkdnFrmt.whiteSpaceKind);
    toggleModal();
  };

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isOpen) {
      toggleModal();
    }
  }

  // tabs

  function setActiveTab(tab: string) {
    activeTab = tab;
  }

  // api

  function notify() {
    alert('If you have an API developer key, you can put it in this input and it will be used when posting to one of the listed LLM providers.\n\nSee the following links to get a key:\n\nhttps://console.anthropic.com/settings/keys\n\nhttps://platform.openai.com/api-keys\n\nPutting API keys into boxes is generally a bad idea! If you have any concerns, create an API key and then revoke it after using this site.');
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
    <p class="modal-title">Options</p>
    <div class="modal-body">
      <div class="tabs">
        <button 
          class="tab-button"
          class:active={activeTab === 'markdown'}
          on:click={() => setActiveTab('markdown')}>
          Markdown Formatting
        </button>
        <button 
          class="tab-button"
          class:active={activeTab === 'llm'}
          on:click={() => setActiveTab('llm')}>
          LLM Models
        </button>
      </div>
      {#if activeTab === 'markdown'}
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
              <option value="white space">white space</option>
              <option value="kabob-space">kabob-space</option>
              <option value="snake_space">snake_space</option>
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
      {:else if activeTab === 'llm'}
        <form class="dropdown-container">
          <div class="dropdown-label">
            <span>Provider</span>
            <select id="indentSelect" bind:value={$llm.provider}>
              <option value="anthropic">Anthropic</option>
              <option value="openai">OpenAI</option>
              <!-- <option value="google">Gemini</option> -->
            </select>
          </div>
          <div class="dropdown-label">
            <span>Model</span>
            {#if $llm.provider === 'anthropic'}
              <select id="indentSelect" bind:value={$llm.anthropic.model}>
                <!-- <option value="claude">Claude</option> -->
                <option value="claude-3-opus-20240229">claude-3-opus-20240229</option>
                <option value="claude-3-5-sonnet-20240620">claude-3-5-sonnet-20240620</option>
                <option value="claude-3-sonnet-20240229">claude-3-sonnet-20240229</option>
                <option value="claude-3-haiku-20240307">claude-3-haiku-20240307</option>
              </select>
            {:else if $llm.provider === 'openai'}
              <select id="indentSelect" bind:value={$llm.openai.model}>
                <!-- <option value="chatgpt">ChatGPT</option> -->
                <option value="gpt-4o">gpt-4o</option>
                <option value="gpt-4-turbo">gpt-4-turbo</option>
                <option value="gpt-4">gpt-4</option>
              </select>
            <!-- {:else if $llm.model === 'google'}
              <select id="indentSelect" bind:value={$llm.google.model}>
                <option value="model">Gemini</option>
              </select> -->
            {/if}
          </div>
          <div class="dropdown-label-info">
            <span><strong>API Keys</strong></span>
            <button class="flex-shrink-0 w-6 h-6 rounded p-0 cursor-pointer flex items-center justify-center pointer-events-auto"
                    on:click={notify}>
              <img id="helpApiKeyIcon" src={imgSrc} class="fill-current text-gray-600 p-1">
            </button>
          </div>
          <div class="dropdown-label">
            <span>Anthropic</span>
            <input id="anthropic_key_risky_but_cool"
                  type="password"
                  class="w-full px-3 py-1.5 bg-gray-200 text-sm border-none rounded focus:outline-none focus:bg-white focus:text-gray-800"
                  placeholder="Your Anthropic API Key (risky but cool)"
                  bind:value={$llm.anthropic.apiKey}
                  on:focus={e => {
                    e.target.type = 'text';
                  }}
                  on:blur={e => {
                    e.currentTarget.type = 'password';
                  }}
                  on:input={e => {
                    localStorage.setItem('api-key-anthropic', e.target.value);
                  }}/>
          </div>
          <div class="dropdown-label">
            <span>OpenAI</span>
            <input id="openai_key_risky_but_cool"
                  type="password"
                  class="w-full px-3 py-1.5 bg-gray-200 text-sm border-none rounded focus:outline-none focus:bg-white focus:text-gray-800"
                  placeholder="Your OpenAI API Key (risky but cool)"
                  bind:value={$llm.openai.apiKey}
                  on:focus={e => {
                    e.target.type = 'text';
                  }}
                  on:blur={e => {
                    e.currentTarget.type = 'password';
                  }}
                  on:input={e => {
                    localStorage.setItem('api-key-openai', e.target.value);
                  }}/>
          </div>
        </form>
      {/if}
    </div>
    <div class="modal-footer">
      <button class="modal-button" on:click={saveOpts}>
        Save
      </button>
    </div>
  </div>
</div>

<style>
  input {
    flex-grow: 1;
    padding: 0.5rem;
    background-color: var(--box-background);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
  }

  select {
    flex-grow: 1;
    padding: 0.5rem;
    background-color: var(--box-background);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
  }

  /* modal */

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

  /* dropdown */

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

  .dropdown-label-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  /* tabs */

  .tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1rem;
  }

  .tab-button {
    background: none;
    color: var(--text-color);
    border-color: var(--accent-color-light);
    border: 1px solid var(--accent-color-light);
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .tab-button:hover {
    opacity: 1;
    border: 1px solid var(--hover-color);
  }

  .tab-button.active {
    opacity: 1;
    border: 1px solid var(--accent-color-light);
    /* border-bottom: 2px solid var(--accent-color); */
  }

  .tab-button.active:hover {
    border: 1px solid var(--hover-color);
  }
</style>
