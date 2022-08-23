<script lang="ts">
  import BlogPostIndex from '$lib/components/blog/BlogPostIndex.svelte';
  import type { PageData } from './$types';

  export let data : PageData;
  let posts : App.BlogPost[];
  
  $: posts = data.posts;
</script>

<BlogPostIndex {posts} />