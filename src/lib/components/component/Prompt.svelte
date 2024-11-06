<script lang='ts'>
  import type { EventDispatcher } from 'svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { SEPARATOR, SEPARATOR_SHORT } from '$lib/util/const';
  import { llm, mkdnFrmt, resetMkdnResult, resultMkdn, userConcept } from '$lib/util/store';

  export let storedApiKey: string = '';
  export let storedApiKeys: Record<string, string> = {};
  export let text: string = '';

  const dispatch: EventDispatcher<any> = createEventDispatcher();

  const placeholders = [
    'tree (art)',
    'tree (botany)',
    'tree (chemistry)',
    'tree (computer science)',
    'tree (engineering)',
    'tree (game theory)',
    'tree (genealogy)',
    'tree (genetics)',
    'tree (linguistics)',
    'tree (mathematics)',
    'tree (mythology)',
    'tree (phylogenetics)',
  ];

  let placeholder: string;

  onMount(async () => {
    placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    if (text.length > 0) {
      $userConcept = text;
      goai();
    }
  });

  async function goai() {
    dispatch('loading', true);
    resetMkdnResult();
    try {
      const response = await fetch('/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: $userConcept,
          opts: {
            llm: $llm,
            mkdn: {
              indent: $mkdnFrmt.indentKind,
              text: $mkdnFrmt.textKind,
              case: $mkdnFrmt.caseKind,
              whitespace: $mkdnFrmt.whiteSpaceKind,
              attrs: $mkdnFrmt.attrKind,
            },
          },
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { result } = await response.json();
      const results: string[] = result.replace(/```/g, '')
        .split(SEPARATOR_SHORT);
      // console.debug('result string: ', result);
      // console.debug('result array: ', results);
      $resultMkdn.all = result.replace(/```/g, '')
                              .replace(new RegExp(SEPARATOR_SHORT, 'g'), '\n\n')
                              .trim();
      $resultMkdn.ancestors = results[0] ? results[0].trim() : '';
      $resultMkdn.atom = results[1] ? results[1].trim() : '';
      $resultMkdn.descendants = results[2] ? results[2].trim() : '';
    } catch (e) {
      console.error('Problem getting result from LLM:', e);
      alert('An error occurred while processing your request. Please try again.');
    } finally {
      dispatch('loading', false);
    }
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
    {placeholder}
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