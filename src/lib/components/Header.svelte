<script lang='ts'>
  import Logo from '$lib/components/Logo.svelte';

  let isMenuOpen: boolean = false;

  const localGerm: string = '/germ';
  const localBonsai: string = '/bonsai'

  function handleClickOutside(event: MouseEvent): void {
    const navElement = document.querySelector('.nav');
    const hamburgerButton = document.querySelector('.hamburger');
    if (navElement && !navElement.contains(event.target)
      && hamburgerButton && !hamburgerButton.contains(event.target)
      && isMenuOpen
    ) {
      toggleMenu();
    }
  }

  function toggleMenu(): void {
    isMenuOpen = !isMenuOpen;
  }
</script>

<svelte:window on:click={handleClickOutside} />

<header class="header">
  <div class="logo-container">
    <Logo size={'small'}></Logo>
    <div class="logo">WikiBonsai</div>
  </div>
  <div class="nav-container">
    <button class="hamburger" on:click={toggleMenu}>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </button>
    <nav class={isMenuOpen ? 'nav open' : 'nav'}>
      <div class="nav-items">
        <a href={localGerm} class="nav-link">Germinator</a>
        <a href={localBonsai} class="nav-link">Maps</a>
        <a href="https://github.com/wikibonsai/" class="nav-link">GitHub</a>
      </div>
      <button class="btn btn-pad">sign up</button>
    </nav>
  </div>
  <!-- <Theme></Theme> -->
</header>

<style>
  .btn {
    background: var(--btn-color);
    color: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }

  .btn:hover {
    background: var(--btn-color--hover);
  }

  .hamburger {
    cursor: pointer;
    /* small */
    display: block;
  }

  .header {
    position: sticky;
    top: 0;
    height: 10vh;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--accent-color-light);
    display: flex;
    padding: 1rem;
    /* small */
    justify-content: space-between;
    align-items: center;
  }

  .line {
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    margin: 4px 0;
  }

  .logo {
    font-size: 1.5rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  .nav {
    display: none;
  }

  .nav.open {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 60px;
    background-color: var(--background-color);
    border: 1px solid var(--accent-color-light);
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    padding: 0em 1em;
    /* small */
    flex-direction: column;
  }

  .nav-items {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* small */
    flex-direction: column;
    padding: 0.5rem;
    padding-bottom: 1rem;
  }

  .nav-link {
    color: var(--text-color);
  }

  .nav-link:hover {
    color: var(--hover-color);
  }

  @media (min-width: 768px) {

    .btn {
      display: block;
    }

    .hamburger {
      display: none;
    }

    .header {
      flex-direction: row;
      justify-content: space-between;
    }

    .nav {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .nav-container {
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
    }

    .nav-items {
      flex-direction: row;
      padding: 0;
    }
  }
</style>
