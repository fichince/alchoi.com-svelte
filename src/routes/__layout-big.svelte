<script lang="ts">
  // TODO - I don't need to do this as a layout if it's only 
  // used on the front page

  import { page } from '$app/stores';

  const title = 'Albert Choi';

  $: pageTitle = $page.stuff.pageTitle;
  $: animate = $page.stuff.animate;

  $: titleBar = (pageTitle ? `${pageTitle} | ` : '') + title;
</script>

<svelte:head>
  <title>{titleBar}</title>
</svelte:head>

<div class="absolute top-0 left-0 w-screen h-screen overflow-hidden">
  <div class="homepage w-full h-full bg-cover scale-110 animate-blur-in blur-sm">
  </div>
  <div class="absolute 
    top-1/4 left-1/4 
    w-1/2 h-1/2 min-h-[450px]
    m-auto 
    bg-gradient-to-br from-primary to-secondary rounded-3xl"
    class:animate-fade-in={animate}>

    <slot></slot>
  </div>
</div>

<style lang="postcss">
  @import "@fontsource/special-elite";
  @import "@fontsource/mononoki";

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .homepage {
    background-image: url(/images/wedge-pond.jpg);
  }
</style>