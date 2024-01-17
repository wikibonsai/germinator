<script lang='ts'>
  import type { EventDispatcher } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { SEPARATOR } from '$lib/util/const';
  import { apiKey, mkdnFrmt, resultMkdn } from '$lib/util/store';
  import { makeReal } from "$lib/util/ai";

  let userMsg: string = '';
  const dispatch: EventDispatcher<any> = createEventDispatcher();

  async function goai() {
    dispatch('loading', true);
    $resultMkdn.ancestors = '';
    $resultMkdn.descendants = '';
    $resultMkdn.atom = '';
    if ($apiKey === '') { alert('Please enter an OpenAI API key'); return; }
    const result: string = await makeReal(
      userMsg,
      {
        apikey: $apiKey,
        indent: $mkdnFrmt.indentKind,
        text: $mkdnFrmt.textKind,
        case: $mkdnFrmt.caseKind,
        whitespace: $mkdnFrmt.whiteSpaceKind,
        attrs: $mkdnFrmt.attrKind,
      },
    );
    const resultStrippedBackTicks: string = result.replace(/```/g, '');
    const results: string[] = resultStrippedBackTicks.split(SEPARATOR);
    console.debug('result string: ', result);
    console.debug('result array: ', results);
    $resultMkdn.all = resultStrippedBackTicks.replace(new RegExp(SEPARATOR, 'g'), '\n\n');
    $resultMkdn.ancestors = results[0];
    $resultMkdn.atom = results[1];
    $resultMkdn.descendants = results[2];
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
    class="box-border text-black focus:outline-green-500 p-2 mb-4 w-full rounded-lg"
    bind:value={userMsg}>
  <button id="growButton"
          class="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg hover:bg-green-600"
          on:click={goai}>
    Grow
  </button>
</div>
