<script context="module" lang="ts">
  // this page is entirely static with no JS interactivity needed
  export const hydrate = false;
  export const router = false;
</script>

<script>
  import Icon from 'svelte-awesome';
  import githubSquare from 'svelte-awesome/icons/githubSquare';
  import facebookSquare from 'svelte-awesome/icons/facebookSquare';
  import linkedinSquare from 'svelte-awesome/icons/linkedinSquare';
  import CoolBackground from '$lib/components/CoolBackground.svelte';

  const pageTitle = 'Albert Choi';
  const metaDescription = 'The homepage of Albert Choi';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />

  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://alchoi.com/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content="https://alchoi.com/favicon.png" />
</svelte:head>

<CoolBackground animate>
  <div class="
    h-32 w-32
    sm:h-52 sm:w-52 
    rounded-full overflow-hidden mx-auto 
    mt-8 border-accent border-2">
    <img src="/images/headshot.jpg" alt="headshot" />
  </div>
  <div class="mx-auto text-center mt-4 
    text-2xl sm:text-3xl 
    font-display text-accent">
    Albert Choi
  </div>
  <div class="mx-auto text-center mt-1 
    text-lg sm:text-xl
    font-display text-accent">
    I write code and sometimes prose.
  </div>

  <div class="flex flex-col sm:flex-row 
    items-center
    mx-auto w-2/3 sm:justify-evenly mt-4 
    text-xl sm:text-2xl 
    text-pop font-display">
    <div class="hover:scale-110">
      <a href="/blog">Blog</a>
    </div>
    <div class="hover:scale-110">
      <a href="/prose">Prose</a>
    </div>
    <div class="hover:scale-110">
      <a href="/">Code</a>
    </div>
  </div>

  <div class="flex mt-4 w-2/3 mx-auto justify-evenly
    text-pop text-2xl sm:text-4xl">
    <a href="https://github.com/fichince" target="_blank" rel="noreferrer noopener"
      class="hover:scale-110">
      <Icon data={githubSquare} scale={3} />
    </a>
    <a href="https://www.facebook.com/albert.choi.583/" target="_blank" rel="noreferrer noopener"
      class="hover:scale-110">
      <Icon data={facebookSquare} scale={3} />
    </a>
    <a href="https://www.linkedin.com/in/albert-choi-202b8923/" target="_blank" rel="noreferrer noopener"
      class="hover:scale-110">
      <Icon data={linkedinSquare} scale={3} />
    </a>
  </div>
</CoolBackground>
