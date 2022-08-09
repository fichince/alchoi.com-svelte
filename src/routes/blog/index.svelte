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
  //import Fuse from 'fuse.js';
  import lunr from 'lunr';
  import type { Index } from 'lunr';

  export let posts : App.BlogPost[];

  if (browser) {
    console.log('Initializing context');

    /*
    const fuseOpts = {
      keys: [ 'description', 'title', 'content' ],
      minMatchCharLength: 3,
      findAllMatches: true,
      threshold: 0.15,
      includeScore: true,
      includeMatches: true,
      ignoreLocation: true,
    };

    const fuse = new Fuse(posts, fuseOpts);
    */
    const search : Index = lunr(function() {
      this.ref('slug');
      this.field('title');
      this.field('description');
      this.field('content');
      this.metadataWhitelist = ['position'];

      for (let post of posts) {
        this.add(post);
      }

      /*
      posts.forEach(function (post) {
        this.add(post);
      }, this);
      */
    });
    setContext<{ search : Index }>('search', { search });
  }

</script>

<BlogPostIndex {posts} hasSearch />