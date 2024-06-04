<script lang='ts'>
  import type { EventDispatcher } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { AI_ERROR, SEPARATOR, SEPARATOR_SHORT } from '$lib/util/const';
  import { apiKey, mkdnFrmt, resultMkdn, userConcept } from '$lib/util/store';
  import { makeReal } from "$lib/util/ai";

  export let storedApiKey: string = '';

  const dispatch: EventDispatcher<any> = createEventDispatcher();

  async function goai() {
    const apiKeyToSend: string = (storedApiKey !== '') ? storedApiKey : $apiKey;
    if (apiKeyToSend === '' ) {
      alert('Please enter an OpenAI API key');
      return;
    }
    dispatch('loading', true);
    $resultMkdn.ancestors = '';
    $resultMkdn.descendants = '';
    $resultMkdn.atom = '';
    if (apiKeyToSend === '') {
      alert('Problem with OpenAI API key, please contact customer support.');
      return;
    }
    const result: string = await makeReal(
      apiKeyToSend,
      $userConcept,
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
      // const resultStrippedBackTicks: string = result.replace(/```/g, '');
      const results: string[] = result.replace(/```/g, '')
                                      .split(SEPARATOR_SHORT);
      console.debug('result string: ', result);
      console.debug('result array: ', results);
      $resultMkdn.all = result.replace(/```/g, '')
                              .replace(new RegExp(SEPARATOR_SHORT, 'g'), '\n\n')
                              .trim();
      $resultMkdn.ancestors = results[0] ? results[0].trim() : '';
      $resultMkdn.atom = results[1] ? results[1].trim() : '';
      $resultMkdn.descendants = results[2] ? results[2].trim() : '';
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

<div class="prompt-container">
  <input
    id="input"
    type="text"
    placeholder="tree (linguistics)"
    class="input box-border"
    bind:value={$userConcept}>
  <button id="growButton"
          class="btn"
          on:click={goai}>
    Grow
  </button>
</div>

<style>
  .prompt-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .input {
    color: var(--text-color);
    background-color: var(--box-background);
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  /* todo */
  /* from: https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/ */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    color: var(--text-color);
    background-color: var(--box-background);
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  .input:focus {
    outline: 2px solid var(--hover-color);
  }
</style>