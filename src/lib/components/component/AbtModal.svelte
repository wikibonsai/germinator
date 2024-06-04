<script lang='ts'>
  import {
    URL_SOCIAL_GITHUB,
    URL_SOCIAL_X,
    URL_TWT_WAY,
    URL_VSCODE_PLUGIN,
    URL_WIKIBONSAI,
  } from '$lib/util/const';
  import { theme } from '$lib/util/store';
  import Logo from '$lib/components/element/Logo.svelte';
  import SocialBar from '$lib/components/component/SocialBar.svelte'

  $: logoGitHub = `/img/social/github-mark-${$theme}.svg`;
  $: logoX = `/img/social/x-${$theme}.png`;

  export let isOpen: boolean = false;
  const semtreeImg: string = '/img/waitbutwhy-neuralink-tree.png';
  const wikibonsaiWayImg: string = '/img/wikibonsai-way-meme.png';

  function closeModal(): void {
    isOpen = false;
  }

  function toggleModal(): void {
    isOpen = !isOpen;
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isOpen) {
      toggleModal();
    }
  }

  let activeTab = 0;
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="modal"
     class:opacity-0={!isOpen}
     class:pointer-events-none={!isOpen}
     class:modal-active={isOpen}>
  <!-- Modal content -->
  <div class="modal-overlay"></div>
  
  <div class="modal-container">
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="modal-content">
      <!-- close / title -->
      <button class="modal-close" on:click={closeModal}>
        <svg class="title-color fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M16.292 2.292l-1.584-1.584-6.708 6.708-6.708-6.708-1.584 1.584 6.708 6.708-6.708 6.708 1.584 1.584 6.708-6.708 6.708 6.708 1.584-1.584-6.708-6.708z"></path>
        </svg>
      </button>
      <Logo which="wikibonsai" />
      <p class="title">A <a href={URL_WIKIBONSAI}>WikiBonsai</a> project.</p>
      <!--Body-->
      <div class="container mx-auto p-4">
        <a href={URL_TWT_WAY}>
          <img src={wikibonsaiWayImg} class="mx-auto" height="100%" width="100%" alt="wikibonsai way meme" />
        </a>
      </div>
      <!--Footer-->
      <div class="modal-footer">
        <SocialBar />
        <button id="okButton"
                class="px-4 bg-green-500 p-3 rounded-lg text-white hover:bg-green-600"
                on:click={toggleModal}>
          Ok
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* 
  blockquotes

  src:
    - https://github.com/wikibonsai/jekyll-wikibonsai/blob/ddc978d53c2eb40f018060207a0760f6e2f42cb4/_sass/base/_markdown.scss#L206
    - https://codepen.io/jimmycow/pen/LmjVaz
    - https://codepen.io/JoeHastings/pen/MOdRVm
  */

  blockquote {
    border-left: 0.25em solid var(--accent-color-light);
  }

  blockquote p {
    padding-left: 1.5em;
    margin: 0.75em;
  }

  blockquote:before {
    color: var(--accent-color-light);
    font-family: 'Special Elite', cursive;
    font-size: 50px;
    content: '"';
    position: absolute;
    padding: 10px;
  }

  .title {
    text-align: center;
    align-self: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .tab-panel {
    margin-top: 1rem;
  }

  .tab-buttons {
    display: flex;
  }

  .tab-button {
    padding: 0.5rem 1rem;
    background-color: #eee;
    border: none;
    cursor: pointer;
  }

  .tab-button.active {
    background-color: #ccc;
  }

  .tab-content {
    margin-top: 1rem;
  }
</style>