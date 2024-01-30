<script lang='ts'>
  import { resultMkdn } from '$lib/util/store';
  import AboutButton from '$lib/components/element/AboutButton.svelte';
  import CopyButton from '$lib/components/element/CopyButton.svelte';
  import MkdnFrmtBtn from '$lib/components/element/MkdnFrmtBtn.svelte';
  import RsltFrmtBtn from '$lib/components/element/RsltFrmtBtn.svelte';
</script>

<div class="flex justify-end items-center mb-4">
  <AboutButton></AboutButton>
  <MkdnFrmtBtn></MkdnFrmtBtn>
  <RsltFrmtBtn></RsltFrmtBtn>
  <CopyButton markdown={$resultMkdn.all}></CopyButton>
</div>
