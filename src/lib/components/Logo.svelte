<script lang='ts'>
  import { theme } from '$lib/util/store';

  export let size: string = 'medium';
  $: logo = `/img/logo/wikibonsai-${$theme}.svg`;

  $: dimensions = {
    small: { width: '50px', height: '40px' },
    medium: { width: '75px', height: '60px' },
    large: { width: '100px', height: '80px' }
  }[size] || { width: '75px', height: '60px' }; // Default to medium if size is not recognized
</script>

<a href="/">
  <img id="wikibonsai-logo"
       src={logo}
       style={`width: ${dimensions.width}; height: ${dimensions.height};`}
       alt="Logo" />
</a>
