<script lang="ts">
  import { writable } from 'svelte/store';
  import AbtBtn from '$lib/components/element/AbtBtn.svelte';
  import Multiplex from './components/Multiplex.svelte';
  import Theme from '$lib/components/element/Theme.svelte';

  const leftSidebar = writable({visible: true, collapsed: false});
  const rightSidebar = writable({visible: true, collapsed: false});

  function toggleSidebar(side: any) {
    side.update((current: any) => {
      if (current.visible && !current.collapsed) {
        return {
          visible: true,
          collapsed: true,
        };
      } else {
        return {
          visible: !current.visible,
          collapsed: false,
        };
      }
    });
  }
</script>

<div class="tend-container">
  <div class="toolbar">
    <Theme></Theme>
    <AbtBtn></AbtBtn>
  </div>
  <div class="sidebar left" class:collapsed={$leftSidebar.collapsed}>
    {#if $leftSidebar.collapsed}
      <button on:click={() => toggleSidebar(leftSidebar)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
          <polyline points="40,10 70,50 40,90" fill="none" stroke="black" stroke-width="10" />
        </svg>
      </button>
    {:else}
      <div class="sidebar-header">
        <button class="close-btn img-btn" on:click={() => toggleSidebar(leftSidebar)}>
          ✕
        </button>
      </div>
      <div class="sidebar-content">
        <!-- Left Sidebar content here -->
      </div>
    {/if}
  </div>

  <div class="main-content">
    <Multiplex></Multiplex>
  </div>

  <div class="sidebar right" class:collapsed={$rightSidebar.collapsed}>
    {#if $rightSidebar.collapsed}
      <button on:click={() => toggleSidebar(rightSidebar)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
          <polyline points="60,10 30,50 60,90" fill="none" stroke="black" stroke-width="10" />
        </svg>
      </button>
    {:else}
      <div class="sidebar-header">
        <button class="close-btn img-btn" on:click={() => toggleSidebar(rightSidebar)}>
          ✕
        </button>
      </div>
      <div class="sidebar-content">
        <!-- Right Sidebar content here -->
      </div>
    {/if}
  </div>
</div>

<style>
  .tend-container {
    height: 100vh;
    width: 100vw;
    display: flex;
  }

  .main-content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .sidebar {
    width: 200px;
    background-color: var(--background-accent-color);
    overflow-y: auto;
    transition: width 0.3s ease;
  }

  .sidebar.collapsed {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-header {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.5rem;
  }

  .close-btn {
    color: var(--text-color);
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .sidebar-content {
    padding: 1rem;
    overflow-y: auto;
  }

  .sidebar.left {
    /* todo */
  }

  .sidebar.right {
    /* todo */
  }

  .tool {
    padding: 10px;
    cursor: pointer;
  }

  .tool:hover {
    background-color: var(--toolbar-hover-color, #555);
  }

  .toolbar {
    width: 50px;
    background-color: var(--background-accent-color);
    overflow-y: auto;
    border-right: 1px solid var(--accent-color-light);
  }

  @media (min-width: 768px) {
    .container {
      min-width: 100vw; /* why do i need this line??? */
    }
  }
</style>
