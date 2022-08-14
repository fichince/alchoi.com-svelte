<script lang="ts">
  import BlogCard from './BlogCard.svelte';
  import TagChooser from './TagChooser.svelte';
  import SearchModal from '../search/SearchModal.svelte';
  import Modal, { bind } from 'svelte-simple-modal';
  import { writable } from 'svelte/store';
  import { browser } from '$app/env'
  import { setContext } from 'svelte';
  import { createSearchIndex } from '$lib/utils';
  import Icon from 'svelte-awesome';
  import search from 'svelte-awesome/icons/search';

  import type { Index } from 'lunr';

  const modal = writable(null);

  export let posts : App.BlogPost[] = [];
  export let selectedTag : string = '';

  let selectedPosts : App.BlogPost[] = posts;

  if (browser) {
    setContext<Index>('search', createSearchIndex(posts));
  }

  const showModal = () => {
    modal.set(bind(SearchModal, { posts }));
  };

  $: {
    if (selectedTag) {
      selectedPosts = posts.filter((p) => p.tags?.includes(selectedTag));
    }
  }

</script>

<!-- this can't be prerendered -->
{#if browser}
  <Modal 
    show={$modal} 
    styleWindow={{ height: '500px' }}
  />
{/if}

<div class="flex flex-col items-center">

  <div class="flex items-baseline my-2">
    <TagChooser {selectedTag} {posts} />
    <button on:click={showModal} aria-label="search" 
      class="hover:animate-bump-small">
      <Icon data={search} scale={1} />
    </button>
  </div>

  {#each selectedPosts as post (post.slug)}
    <BlogCard {post} />
  {/each}
</div>