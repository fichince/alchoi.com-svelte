<script context="module" lang="ts">
  import BlogPostIndex from '../../components/blog/BlogPostIndex.svelte';
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
  export let posts : App.BlogPost[];
</script>

<BlogPostIndex {posts} />