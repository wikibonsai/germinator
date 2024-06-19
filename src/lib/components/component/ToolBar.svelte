<script lang='ts'>
  import { resultMkdn } from '$lib/util/store';
  import AbtBtn from '$lib/components/element/AbtBtn.svelte';
  import CpyBtn from '$lib/components/element/CpyBtn.svelte';
  import MkdnFrmtBtn from '$lib/components/element/MkdnFrmtBtn.svelte';
  import RsltFrmtBtn from '$lib/components/element/RsltFrmtBtn.svelte';
  import ShareBtn from '$lib/components/element/ShareBtn.svelte';
</script>

<div class="flex justify-end items-center mb-4">
  <AbtBtn />
  <ShareBtn />
  <MkdnFrmtBtn />
  <RsltFrmtBtn />
  <CpyBtn markdown={$resultMkdn.all} />
</div>
