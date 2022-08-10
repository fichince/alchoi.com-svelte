<script lang="ts">
  import SearchResult from './SearchResult.svelte';

  import { getContext } from 'svelte';
  import debounce from 'lodash/debounce';
  import find from 'lodash/find';
  import type { Index } from 'lunr';

  const search = getContext<Index>('search');

  export let posts : App.BlogPost[] = [];

  let searchTerm : string;
  let searchResults : Index.Result[] = [];

  const handleChange = debounce((e) => {
    searchTerm = e.target.value;
  }, 500);

  $: {
    if (searchTerm) {
      console.log('search', searchTerm);
      searchResults = search.search(searchTerm);
    } else {
      searchResults = [];
    }
  }

</script>

<input type="text" on:input={handleChange}
  class="border rounded-md border-accent" />

{#each searchResults as result}
  {@const post = find(posts, { slug: result.ref })}
  {#if post}
    <SearchResult {result} {post} />
  {/if}
{/each}
