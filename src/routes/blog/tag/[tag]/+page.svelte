<script lang="ts">
  import BlogPostIndex from '$lib/components/blog/BlogPostIndex.svelte';
  import type { PageData } from './$types';

  export let data : PageData;

  $: ({ posts, selectedTag } = data);

</script>

<BlogPostIndex {posts} {selectedTag} />