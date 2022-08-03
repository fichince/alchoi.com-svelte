<script lang="ts">
  import BlogCard from './BlogCard.svelte';

  export let posts : App.BlogPost[] = [];
  export let selectedTag : string = '';
</script>


<div class="flex flex-col items-center">
  <!--<TagChooser selectedTag={selectedTag} />-->
  {#each posts as post (post.slug)}
    <BlogCard {post} />
  {/each}
</div>