<script lang="ts">
  import NavLink from '$lib/components/NavLink.svelte';
  import MD from '$lib/components/MD.svelte';
  import removeMd from 'remove-markdown';

  import { page } from '$app/stores';

  const NAV = [
    {
      name: 'Blog',
      to: '/blog'
    },
    {
      name: 'Code',
      to: '/code'
    },
    {
      name: 'Prose',
      to: '/prose'
    },
  ];

  const title = 'Albert Choi';

  let expanded : boolean = true;
  let innerWidth : number = 640;
  let titleBar = '';

  const toggleExpanded = () => {
    expanded = !expanded;
  };

  $: pageTitle = $page.stuff.pageTitle;

  $: expanded = innerWidth > 640;

  $: {
    titleBar = (pageTitle ? `${pageTitle} | ` : '') + title;
    titleBar = removeMd(titleBar);
  }

</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{titleBar}</title>
</svelte:head>

<div class="m-auto">
  <nav class="relative select-none bg-accent sm:flex sm:items-stretch w-full text-lg sm:text-xl">
    <div class="flex flex-no-shrink items-stretch h-12">
      <NavLink to="/" name={title} />
      <button class="block sm:hidden cursor-pointer ml-auto relative w-12 h-12 p-4" on:click={toggleExpanded}>
        {#if expanded}
          <svg class="fill-current text-tertiary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
        {:else}
          <svg class="fill-current text-tertiary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        {/if}
      </button>
    </div>
    {#if expanded}
      <div class="sm:flex sm:items-stretch sm:flex-no-shrink sm:flex-grow">
        <div class="sm:flex sm:items-stretch sm:justify-end ml-auto">
        {#each NAV as { name, to } (name)}
          <NavLink {to} {name} />
        {/each}
        </div>
      </div>
    {/if}
  </nav>

  <main class="pt-10 pb-20 px-5">
    {#if pageTitle}
    <div class="mt-3 sm:mt-5 mx-auto text-3xl sm:text-5xl text-center text-accent font-display">
      <MD md={pageTitle} />
    </div>
    <hr class="my-4 mx-auto w-full sm:w-3/4 text-center border-accent" />
    {/if}

    <slot></slot>

  </main>

</div>

<style global lang="postcss">
  @import "@fontsource/special-elite";
  @import "@fontsource/crimson-pro";
  @import "@fontsource/crimson-pro/400-italic.css";
  @import "@fontsource/mononoki";

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>