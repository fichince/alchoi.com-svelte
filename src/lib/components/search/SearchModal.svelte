<script lang="ts">
  import SearchResult from './SearchResult.svelte';

  import { getContext } from 'svelte';
  import debounce from 'lodash/debounce';
  import find from 'lodash/find';

  const { search } = getContext('search');

  export let posts : App.BlogPost[] = [];

  let searchTerm : string;
  let searchResults : any[] = [];

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
  <SearchResult {result} {post} />
{/each}
