<script lang='ts'>
  import {
    URL_SOCIAL_GITHUB,
    URL_SOCIAL_X,
    URL_TWT_NODE,
    URL_TWT_WAY,
    URL_WIKIBONSAI,
    URL_WIKIBONSAI_TREE,
    URL_VSCODE_PLUGIN,
  } from '$lib/util/const';
  import { theme } from '$lib/util/store';
  import Logo from '$lib/components/element/Logo.svelte';
  import SocialBar from '$lib/components/component/SocialBar.svelte'

  export let isOpen: boolean = false;
  // const imgSemTree: string = '/img/waitbutwhy-neuralink-tree.png';
  const imgWikiBonsaiWay: string = '/img/wikibonsai-way-meme.png';
  const imgConceptNode: string = '/img/guilford-concept-node.png';

  $: logoGitHub = `/img/social/github-mark-${$theme}.svg`;
  $: logoX = `/img/social/x-${$theme}.png`;

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
    <p class="modal-title">About</p>
    <div class="modal-body">
      <p>If you were to view a concept up close, it might look like this:</p>
      <a class="modal-img" href={URL_TWT_NODE}>
        <img src={imgConceptNode} height=50% width=50% alt="guilford concept node diagram" />
      </a>
      <p>And if you took a step back, many conceptss might look like this:</p>
      <a class="modal-img" href={URL_TWT_WAY}>
        <img src={imgWikiBonsaiWay} height=100% width=100% alt="wikibonsai way meme" />
      </a>
      <p>If you want to see a fuller knowledge bonsai you can see one <a href={URL_WIKIBONSAI_TREE}>here</a>.</p>
      <p>If you want to work more with markdown, you can go <a href={URL_VSCODE_PLUGIN}>here</a>.</p>
    </div>
    <div class="modal-footer">
      <SocialBar />
      <button class="modal-button" on:click={toggleModal}>
        Ok
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
    /* closed */
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .modal-content {
    background-color: var(--background-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }

  .modal-content p {
    padding: 0.5rem 0;
  }

  .modal-close {
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
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .modal-img {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
  }

  .modal-img:hover img {
    cursor: pointer;
    border: 3px solid var(--hover-color);
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

  .modal-quote {
    border-left: 0.25em solid var(--accent-color-light);
    padding-left: 3rem;
    margin: 1rem 1.5rem;
    position: relative;
  }

  .modal-quote::before {
    color: var(--accent-color-light);
    font-family: 'Special Elite', cursive;
    font-size: 50px;
    content: '"';
    position: absolute;
    top: -1rem;
    left: 0.5rem;
  }

  .modal-quote p {
    margin: 0.75em;
  }

  .modal-quote cite {
    font-style: italic;
  }

  .modal-text {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  .modal-button {
    background-color: var(--hover-color);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-button:hover {
    background-color: var(--hover-color);
  }
</style>
