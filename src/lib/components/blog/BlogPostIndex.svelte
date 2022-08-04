<script lang="ts">
  import BlogCard from './BlogCard.svelte';
  import TagChooser from './TagChooser.svelte';

  export let posts : App.BlogPost[] = [];
  export let selectedTag : string = '';

  $: selectedPosts = selectedTag ? 
      posts.filter((p) => p.tags?.includes(selectedTag)) :
      posts;

</script>


<div class="flex flex-col items-center">
  <TagChooser {selectedTag} {posts} />
  {#each selectedPosts as post (post.slug)}
    <BlogCard {post} />
  {/each}
</div>