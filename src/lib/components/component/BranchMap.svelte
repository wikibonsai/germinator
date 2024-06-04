<script lang='ts'>
  import { onMount } from 'svelte';
  import { GREEN, LIGHT_BROWN } from '$lib/util/const';
  import { mkdnFrmt, resultMkdn, userConcept } from '$lib/util/store';

  export let markdown: string = 'no markdown received';
  let branch: string[] = [];

  $: if (markdown && markdown.length > 0) {
    extractBranch();
  }

  onMount(() => {
    extractBranch();
  });
  
  function extractBranch() {
    branch = markdown.split(' > ');
  }
</script>

<ul class="tree">
  {#each branch as b, index}
    <li style="--level: {index};">
      <span>{b}</span>
    </li>
  {/each}
</ul>

<style>
  .tree {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tree li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    line-height: 20px;
    color: var(--text-color);
  }

  .tree li::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-left: 1px solid #8C6239;
    border-bottom: 1px solid #8C6239;
  }

  .tree li::before {
    left: calc(var(--level) * 20px);
  }

  .tree li span {
    display: inline-block;
    margin-left: calc(var(--level) * 20px + 5px);
  }

  .tree li::after {
    content: "";
    position: absolute;
    top: 5px;
    left: calc(var(--level) * 20px + 10px);
    width: 10px;
    height: 10px;
    background-color: #31AF31;
    border-radius: 50%;
  }
</style>
