<script lang='ts'>
  import type { EventDispatcher } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { AI_ERROR, SEPARATOR } from '$lib/util/const';
  import { mkdnFrmt, resultMkdn } from '$lib/util/store';
  import { makeReal } from "$lib/util/ai";

  export let apiKey: string = '';

  const dispatch: EventDispatcher<any> = createEventDispatcher();
  let userMsg: string = '';

  async function goai() {
    if (apiKey === '' ) {
      alert('Please enter an OpenAI API key');
      return;
    }
    dispatch('loading', true);
    $resultMkdn.ancestors = '';
    $resultMkdn.descendants = '';
    $resultMkdn.atom = '';
    if (apiKey === '') { alert('Problem with OpenAI API key, please contact customer support.'); return; }
    const result: string = await makeReal(
      apiKey,
      userMsg,
      {
        indent: $mkdnFrmt.indentKind,
        text: $mkdnFrmt.textKind,
        case: $mkdnFrmt.caseKind,
        whitespace: $mkdnFrmt.whiteSpaceKind,
        attrs: $mkdnFrmt.attrKind,
      },
    );
    if (result.indexOf(AI_ERROR) === 0) {
      alert(result);
    } else {
      const resultStrippedBackTicks: string = result.replace(/```/g, '');
      const results: string[] = resultStrippedBackTicks.split(SEPARATOR);
      console.debug('result string: ', result);
      console.debug('result array: ', results);
      $resultMkdn.all = resultStrippedBackTicks.replace(new RegExp(SEPARATOR, 'g'), '\n\n');
      $resultMkdn.ancestors = results[0];
      $resultMkdn.atom = results[1];
      $resultMkdn.descendants = results[2];
    }
    dispatch('loading', false);
  }

  async function submit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      goai();
    }
  }
</script>

<svelte:window on:keydown={submit} />

<div class="flex items-center gap-2.5">
  <input
    id="input"
    type="text"
    placeholder="tree (linguistics)"
    class="input box-border"
    bind:value={userMsg}>
  <button id="growButton"
          class="btn"
          on:click={goai}>
    Grow
  </button>
</div>

<style>
  .btn {
    background: var(--btn-color);
    color: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }

  .btn:hover {
    background: var(--btn-color--hover);
  }

  .input {
    color: var(--text-color);
    background-color: var(--box-background);
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .input:focus {
    outline: 2px solid var(--hover-color);
  }
</style>