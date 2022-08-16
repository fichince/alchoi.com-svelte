<script lang="ts">
  import SearchResult from './SearchResult.svelte';
  import { blur } from 'svelte/transition';

  import { getContext } from 'svelte';
  import debounce from 'lodash/debounce';
  import find from 'lodash/find';
  import type { Index } from 'lunr';

  const search = getContext<Index>('search');

  export let posts : App.BlogPost[] = [];

  let searchTerm : string = '';
  let searchResults : Index.Result[] = [];

  const handleChange = debounce((e) => {
    searchTerm = e.target.value;
  }, 500);

  $: {
    if (searchTerm) {
      searchResults = search.search(searchTerm);
    } else {
      searchResults = [];
    }
  }

</script>

<div class="h-full flex flex-col">
  <div class="flex-grow-0 mb-2">
    <input type="text" on:input={handleChange}
      class="border rounded-md border-accent p-3 mt-10 
        w-full text-2xl font-display focus:ring-pop" />
  </div>

  <div class="flex-grow max-h-[375px] overflow-y-auto">

  {#if searchResults.length > 0}
    {#each searchResults as result, index (result.ref)}
      {@const post = find(posts, { slug: result.ref })}
      {#if post}
        <div in:blur={{ delay: index * 75 }}>
          <SearchResult {result} {post} />
        </div>
      {/if}
    {/each}

  {:else}
    <div class="p-2 mb-2 border rounded-md border-gray-400 font-display text-lg" in:blur>
      { searchTerm.length > 0 ? `Nothing found for ${searchTerm}` : 'Search for something ' }
    </div>
  {/if}

  </div>
</div>
