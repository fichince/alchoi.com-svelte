<script lang="ts">
  import each from 'lodash/each';
  import clamp from 'lodash/clamp';
  import take from 'lodash/take';

  import type { Index } from 'lunr';

  export let result : Index.Result;
  export let post : App.BlogPost;
  export let searchTerm : string;

  $: console.log('search result', result.ref);
  $: console.log('search result', result);

  const toDisplay = (source : string, positions? : App.MatchPositions) : string[] => {

    const result : string[] = [];
    if (!positions) return result;

    for (let pos of positions.position) {
      const [ matchStart, matchLength ] = pos;

      const start = clamp(matchStart - 10, 0, source.length);
      const end = clamp(matchStart + matchLength + 10, 0, source.length);

      const str = source.substring(start, end);

      //const hlStart = Math.min(10, matchStart - start);
      //const hlEnd = clamp(10 + matchLength, source.length);

      result.push(str);
    }

    return result;
  };

  type Highlight = {
    before?: string,
    highlight?: string,
    after?: string,
  };

  const highlightSearch = (match : string) : Highlight | null => {
    if (!match || !searchTerm) return null;

    const index = match.toLowerCase().indexOf(searchTerm.toLowerCase());

    const before = match.substring(0, index);
    const highlight = match.substring(index, index + searchTerm.length);
    const after = match.substring(index + searchTerm.length);
    return { before, highlight, after };
  };

  let titleMatches : string[] = [];
  let descriptionMatches : string[] = [];
  let contentMatches : string[] = [];
  let bodyMatches : string[] = [];

  $: {
    const metadata = Object.values(result.matchData.metadata)?.[0] as App.SearchResultMetadata;
    titleMatches = toDisplay(post?.title || '', metadata?.title);
    descriptionMatches = toDisplay(post?.description || '', metadata?.description);
    contentMatches = toDisplay(post?.content || '', metadata?.content);
  }

  $: console.log('titleMatches', titleMatches);
  $: console.log('descriptionMatches', descriptionMatches);
  $: console.log('contentMatches', contentMatches);

  $: bodyMatches = take([...descriptionMatches, ...contentMatches], 4);

</script>

<div class="p-2 border border-gray-700">
  {#if titleMatches.length > 0}
    { @const { before, highlight, after } = highlightSearch(post.title) || {} }
    <span>{before}</span>
    <mark>{highlight}</mark>
    <span>{after}</span>
  {:else}
    <span>{post.title}</span>
  {/if}

  {#if bodyMatches.length > 0}
    <ul>
      {#each bodyMatches as match}
      { @const { before, highlight, after } = highlightSearch(match) || {} }
      <li>
        <span>{before}</span>
        <mark>{highlight}</mark>
        <span>{after}</span>
      </li>
      {/each}
    </ul>
  {/if}
</div>