<script context="module" lang="ts">
  import BlogPostIndex from '$lib/components/blog/BlogPostIndex.svelte';
  import type { Load } from './__types/index';

  export const load: Load = async ({ props }) => {
    return {
      stuff: {
        pageTitle: 'Blog'
      },
      props
    };
  };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { browser } from '$app/env';
  import { createSearchIndex } from '$lib/utils';

  import type { Index } from 'lunr';

  export let posts : App.BlogPost[];

  if (browser) {
    setContext<Index>('search', createSearchIndex(posts));
  }

</script>

<BlogPostIndex {posts} />