<!-- note: styles work best with ~3 cards -->

<script lang='ts'>
  import { goTo } from '$lib/util/func';

  // keys: title, values: url, description
  export let content: Record<string, string[]> = {};
</script>

<div class="card-container">
  {#each Object.entries(content) as [title, [url, description]]}
    <button class="card" on:click={goTo(url)}>
      <h3 class="card-title">{title}</h3>
      <p class="card-description">{description}</p>
    </button>
  {/each}
  <!-- <button class="card" on:click={goTo(localMap)}>
    <h3 class="card-title">Maps</h3>
    <p class="card-description">Browse some example knowledge bonsais.</p>
  </button>
  <button class="card" on:click={goTo(localGerm)}>
    <h3 class="card-title">The Germinator</h3>
    <p class="card-description">Query an LLM to generate conceptual analyses.</p>
  </button>
  <button class="card" on:click={goTo(appVSCodeWikiBonsai)}>
    <h3 class="card-title">Markdown</h3>
    <p class="card-description">Tend your markdown notes in VSCode.</p>
  </button> -->
</div>

<style>
  .card-container {
    display: flex;
    align-items: center;
    padding: 1rem;
    /* small */
    flex-direction: column;
  }

  .card {
    height: 200px;
    background-color: var(--accent-color-light);
    border: 1px solid var(--accent-color-dark);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    margin: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* small */
    width: 80%;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--hover-color);
  }

  .card-title {
    color: var(--text-color);
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease; /* transition for hover */
  }

  .card:hover .card-title {
   color: var(--hover-color);
  }

  .card-description {
    color: var(--text-color);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .card {
      width: 30%;
    }

    .card-container {
      flex-direction: row;
      align-items: center;
    }
  }
</style>