<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Fuse from 'fuse.js';
  import debounce from 'lodash/debounce';
  import map from 'lodash/map';

  const dispatch = createEventDispatcher();

  export let posts : App.BlogPost[] = [];

  let fuse : Fuse<App.BlogPost>;
  let searchTerm : string;

  const handleChange = debounce((e) => {
    searchTerm = e.target.value;
  }, 500);

  onMount(() => {

    const fuseOpts = {
      keys: [ 'description', 'title', 'content' ],
      minMatchCharLength: 2,
      threshold: 0.25,
      includeScore: true,
      includeMatches: true,
      ignoreLocation: true,
    };

    fuse = new Fuse(posts, fuseOpts);
  });

  $: {
    if (searchTerm) {
      const searchResult = fuse.search(searchTerm);
      const indices = map(searchResult, 'refIndex');
      dispatch('search', indices);
    } else {
      dispatch('search', []);
    }
  }


</script>

<input type="text" on:input={handleChange} 
  class="bg-slate-300 border-2 border-black rounded-md"
/>