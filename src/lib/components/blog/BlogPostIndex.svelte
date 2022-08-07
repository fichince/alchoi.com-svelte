<script lang="ts">
  import BlogCard from './BlogCard.svelte';
  import TagChooser from './TagChooser.svelte';
  import SearchBar from './SearchBar.svelte';

  export let posts : App.BlogPost[] = [];
  export let selectedTag : string = '';
  export let hasSearch : boolean = false;

  let searchResults : number[] = [];
  let initialPosts : App.BlogPost[] = posts;
  let selectedPosts : App.BlogPost[];

  const handleSearchResults = (e : any) => {
    searchResults = e.detail;
  };

  $: {
    if (selectedTag) {
      initialPosts = posts.filter((p) => p.tags?.includes(selectedTag));
    }
  }

  $: {
    if (searchResults.length > 0) {
      selectedPosts = searchResults.map((index) => initialPosts[index]);
    } else {
      selectedPosts = initialPosts;
    }
  }

</script>


<div class="flex flex-col items-center">
  <TagChooser {selectedTag} {posts} />
  <SearchBar posts={initialPosts} on:search={handleSearchResults} />

  {#each selectedPosts as post (post.slug)}
    <BlogCard {post} />
  {/each}
</div>