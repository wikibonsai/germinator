<script lang='ts'>
  import { goTo } from '$lib/util/func';

  export let title: string = 'dropdown';
  export let items: { slug: string, title: string }[] = [];

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function go(route: string, event: HTMLAnchorElement): void {
    event.preventDefault();
    goTo(route);
  }

  function handleClickOutside(event: MouseEvent): void {
    if (event.target && !event.target.closest('.dropdown')) {
      isDropdownOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown">
  <button class="dropdown-button" on:click={toggleDropdown}>{title}</button>
  {#if isDropdownOpen}
    <div class="dropdown-menu">
      {#each items as item}
        <a href={item.route} class="dropdown-item" on:click={go(item.route)}>
          {item.title}
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
    padding: 0.5rem 1rem;
  }

  .dropdown-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--accent-color-dark);
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .dropdown-item {
    color: var(--text-color);
    display: block;
    padding: 0.5rem 1rem;
  }

  .dropdown-item:hover {
    background-color: var(--accent-color-light);
  }

  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: var(--box-background);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    margin-top: 0.5rem;
    min-width: 100%;
  }
</style>
