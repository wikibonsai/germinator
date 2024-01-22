<script lang='ts'>
  let hovered: boolean = false;
</script>

<div class="workflow-section" role="list">
  <div class="workflow"
       on:mouseover="{() => hovered = 1}"
       on:mouseout="{() => hovered = 0}"
       on:focus="{() => hovered = 2}"
       on:blur="{() => hovered = 0}"
       role="listitem"
       tabindex="-1">
    <h2 class="workflow-title">Markdown Webs</h2>
    <p class="workflow-description">Extend markdown with <code>[[wikirefs]]</code> and <code>:semantic::attributes</code></p>
  </div>
  <div class="workflow"
       on:mouseover="{() => hovered = 2}"
       on:mouseout="{() => hovered = 0}"
       on:focus="{() => hovered = 2}"
       on:blur="{() => hovered = 0}"
       role="listitem"
       tabindex="-1">
    <h2 class="workflow-title">Markdown Trees</h2>
    <p class="workflow-description">Cultivate and train a knowledge bonsai in markdown</p>
  </div>
  <div class="workflow"
       on:mouseover="{() => hovered = 3}"
       on:mouseout="{() => hovered = 0}"
       on:focus="{() => hovered = 2}"
       on:blur="{() => hovered = 0}"
       role="listitem"
       tabindex="-1">
    <h2 class="workflow-title">Graphs</h2>
    <p class="workflow-description">Make a memory palace from your markdown with graph visualizations</p>
  </div>
  <div class="workflow"
       on:mouseover="{() => hovered = 4}"
       on:mouseout="{() => hovered = 0}"
       on:focus="{() => hovered = 2}"
       on:blur="{() => hovered = 0}"
       role="listitem"
       tabindex="-1">
    <h2 class="workflow-title">AI</h2>
    <p class="workflow-description">Assisted concept analysis with LLMs</p>
  </div>
</div>

<style>
  .workflow-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 2rem;
  }

  .workflow {
    height: 150px;
    background-color: var(--background-color);
    border: 1px solid var(--accent-color-dark);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem;
    text-align: center;
    transition: background-color 0.3s ease;
    transition: color 0.3s ease; /* transition for hover */
    /* small */
    width: 100%;
  }

  .workflow:hover .workflow-title {
    color: var(--hover-color);
  }

  .workflow:hover, .workflow:focus {
    background-color: var(--accent-color-light); /* Tint color on hover/focus */
  }

  .workflow-title {
    color: var(--text-color);
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .workflow-description {
    color: var(--text-color);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .workflow-section {
      justify-content: space-between;
    }

    .workflow {
      width: 45%; /* Adjust for two columns */
    }
  }
</style>