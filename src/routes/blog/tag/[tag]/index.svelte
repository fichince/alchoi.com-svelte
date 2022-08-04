<script context="module" lang="ts">
  import BlogPostIndex from '$lib/components/blog/BlogPostIndex.svelte';
  import type { Load } from './__types/index';

  export const load: Load = async ({ props }) => {
    return {
      stuff: {
        pageTitle: `Blog (${props.tag})`
      },
      props
    };
  };
</script>

<script lang="ts">
  export let posts : App.BlogPost[];
  export let tag : string;
</script>

<BlogPostIndex {posts} selectedTag={tag} />