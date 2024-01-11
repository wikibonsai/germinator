<script lang='ts'>
  import { onMount } from 'svelte';

  onMount(() => {
    const apiKey: string | null = localStorage.getItem('api-key');
    document.getElementById('openai_key_risky_but_cool').value = apiKey;
  });
</script>

<div class="fixed bottom-4 right-4 w-full max-w-xs flex flex-row gap-1 rounded p-1.5 z-50 pointer-events-none api-key-input-bg-color">
  <div class="relative flex-grow pointer-events-auto">
    <input
      id="openai_key_risky_but_cool"
      type="password"
      class="w-full px-3 py-1.5 bg-gray-200 text-sm border-none rounded focus:outline-none focus:bg-white focus:text-gray-800"
      placeholder="Your OpenAI API Key (risky but cool)"
      on:focus={e => {
        e.target.type = 'text';
      }}
      on:blur={e => {
        e.currentTarget.type = 'password';
      }}
      on:input={e => {
        localStorage.setItem('api-key', e.target.value);
      }}
    />
  </div>
  <button class="flex-shrink-0 w-8 h-8 rounded p-0 cursor-pointer flex items-center justify-center pointer-events-auto" onclick="alert('If you have an OpenAI developer key, you can put it in this input and it will be used when posting to OpenAI.\n\nSee https://platform.openai.com/api-keys to get a key.\n\nPutting API keys into boxes is generally a bad idea! If you have any concerns, create an API key and then revoke it after using this site.)')">
    <img id="helpApiKeyIcon" src="/img/icons/icons8-help-50.png" class="fill-current text-gray-600">
  </button>
</div>
