<!-- "animate on scroll" -->
<script lang="ts">
  import { inview } from 'svelte-inview';

  export let as : string = 'div';

  let shouldShow : boolean = false;
  const handleChange = (event : any) => {
    const { detail: { inView } } = event;
    shouldShow = inView;
  };

  const options = {
    rootMargin: '0px 0px -10% 0px',
  };

</script>

<svelte:element this={as} 
  class={$$props.class} 
  use:inview={options} 
  on:change={handleChange}
  class:show={shouldShow}
  class:hide={!shouldShow}>
  <slot />
</svelte:element>

<style lang="postcss">
  .hide {
    @apply opacity-0 transition-opacity duration-700;
  }
  .show {
    @apply opacity-100 transition-opacity duration-700;
  }
</style>