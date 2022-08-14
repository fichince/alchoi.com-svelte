<script lang="ts">
  import BlogCard from './BlogCard.svelte';
  import TagChooser from './TagChooser.svelte';
  import SearchModal from '../search/SearchModal.svelte';
  import Modal, { bind } from 'svelte-simple-modal';
  import { writable } from 'svelte/store';
  import { browser } from '$app/env'
  import { setContext } from 'svelte';
  import { createSearchIndex } from '$lib/utils';

  import type { Index } from 'lunr';

  const modal = writable(null);

  export let posts : App.BlogPost[] = [];
  export let selectedTag : string = '';

  let searchResults : number[] = [];
  let initialPosts : App.BlogPost[] = posts;
  let selectedPosts : App.BlogPost[];

  if (browser) {
    setContext<Index>('search', createSearchIndex(posts));
  }

  const handleSearchResults = (e : any) => {
    searchResults = e.detail;
  };

  const showModal = () => {
    modal.set(bind(SearchModal, { posts }));
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
  <!--<SearchBar posts={initialPosts} on:search={handleSearchResults} />-->

  <!-- this can't be prerendered -->
  {#if browser}
    <Modal 
      show={$modal} 
      styleWindow={{ height: '500px' }}
    />
  {/if}

  <button on:click={showModal}>Search</button>

  {#each selectedPosts as post (post.slug)}
    <BlogCard {post} />
  {/each}
</div>