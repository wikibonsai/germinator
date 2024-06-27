<script lang='ts'>
  import { resultMkdn } from '$lib/util/store';
  import AbtBtn from '$lib/components/element/AbtBtn.svelte';
  import CpyBtn from '$lib/components/element/CpyBtn.svelte';
  import MkdnFrmtBtn from '$lib/components/element/MkdnFrmtBtn.svelte';
  import RsltFrmtBtn from '$lib/components/element/RsltFrmtBtn.svelte';
  import ShareBtn from '$lib/components/element/ShareBtn.svelte';
</script>

<div class="toolbar-container">
  <AbtBtn />
  <MkdnFrmtBtn />
  <RsltFrmtBtn />
  <ShareBtn />
  <CpyBtn markdown={$resultMkdn.all} />
</div>

<style>
  .toolbar-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>
