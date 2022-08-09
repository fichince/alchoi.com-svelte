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
  import mapValues from 'lodash/mapValues';
  import { stripMarkdown } from '$lib/utils';

  import lunr from 'lunr';
  import type { Index } from 'lunr';

  export let posts : App.BlogPost[];

  if (browser) {
    console.log('Initializing context');

    const search : Index = lunr(function() {
      this.ref('slug');
      this.field('title');
      this.field('description');
      this.field('content');
      this.metadataWhitelist = ['position'];

      for (let post of posts) {
        this.add(mapValues(post, stripMarkdown));
      }
    });

    setContext<{ search : Index }>('search', { search });
  }

</script>

<BlogPostIndex {posts} hasSearch />