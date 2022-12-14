<script lang="ts">
  import NavLink from '$lib/components/NavLink.svelte';
  import MD from '$lib/components/MD.svelte';
  import { stripMarkdown } from '$lib/utils';
  import { onMount } from 'svelte';

  import { page } from '$app/stores';
  import Icon from 'svelte-awesome';
  import sunO from 'svelte-awesome/icons/sunO';
  import moonO from 'svelte-awesome/icons/moonO';

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
  let theme = 'dark';

  onMount(() => {
    theme = localStorage.getItem('theme') || 'dark';
  });

  const toggleExpanded = () => {
    expanded = !expanded;
  };

  const setDarkMode = (theme : string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDark = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setDarkMode(newTheme);
      localStorage.setItem('theme', newTheme);

      theme = newTheme;
    }
  };

  $: pageTitle = stripMarkdown($page.data.pageTitle);
  $: description = stripMarkdown($page.data.description);
  $: metaDescription = `${pageTitle} - ${description}`;

  $: expanded = innerWidth > 640;

  $: titleBar = (pageTitle ? `${pageTitle} | ` : '') + title;

</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{titleBar}</title>
  <meta name="description" content={metaDescription} />

  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://alchoi.com/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content="https://alchoi.com/favicon.png" />
  <script>
    var theme = localStorage.getItem('theme');
    if (!theme) {
      // initialize theme based on system dark mode preference
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      theme = prefersDark ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</svelte:head>

<div class="m-auto min-h-screen bg-primary dark:bg-primary-dark">
  <nav class="relative select-none bg-accent dark:bg-accent-dark sm:flex sm:items-stretch w-full text-lg sm:text-xl">
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

          <div class="flex-no-grow flex-no-shrink relative py-3 px-5 leading-normal text-tertiary dark:text-tertiary-dark font-display 
            no-underline flex items-center 
            hover:bg-tertiary dark:hover:bg-tertiary-dark
            hover:text-accent dark:hover:text-accent-dark">
            <button on:click={toggleDark}>
              <Icon data={theme === 'dark' ? sunO : moonO} scale={1.5} />
            </button>
          </div>
        </div>
      </div>
    {/if}
  </nav>

  <main class="pt-10 pb-20 px-5">
    {#if pageTitle}
    <div class="mt-3 sm:mt-5 mx-auto text-3xl sm:text-5xl text-center text-accent dark:text-accent-dark font-display">
      <MD md={pageTitle} />
    </div>
    <hr class="my-4 mx-auto w-full sm:w-3/4 text-center border-accent dark:border-accent-dark" />
    {/if}

    <slot></slot>

  </main>

</div>

<style lang="postcss">
  @import "@fontsource/special-elite";
  @import "@fontsource/crimson-pro";
  @import "@fontsource/crimson-pro/400-italic.css";
  @import "@fontsource/mononoki";

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>