<script lang="ts">
  import SearchResult from './SearchResult.svelte';

  import { getContext } from 'svelte';
  import debounce from 'lodash/debounce';
  import map from 'lodash/map';

  const { fuse } = getContext('search');

  let searchTerm : string;
  let searchResults : any[] = [];

  const handleChange = debounce((e) => {
    searchTerm = e.target.value;
  }, 500);

  $: {
    if (searchTerm) {
      searchResults = fuse.search(searchTerm);
    } else {
      searchResults = [];
    }
  }

</script>

<input type="text" on:input={handleChange}
  class="border rounded-md border-accent" />

{#each searchResults as result}
  <SearchResult {result} />
{/each}
