<script lang="ts">
  import take from 'lodash/take';

  import type { Index } from 'lunr';
  import { stripMarkdown, extractHighlights } from '$lib/utils';

  export let result : Index.Result;
  export let post : App.BlogPost;

  let titleHighlights : App.Highlight[] = [];
  let bodyHighlights : App.Highlight[] = [];

  $: {
    const metadata = Object.values(result.matchData.metadata)?.[0] as App.SearchResultMetadata;
    titleHighlights = extractHighlights(post?.title || '', metadata?.title);
    bodyHighlights = take([
      ...extractHighlights(post?.description || '', metadata?.description),
      ...extractHighlights(post?.content || '', metadata?.content),
    ], 3)
  }

  $: title = stripMarkdown(post.title);

</script>

<div class="p-2 border border-gray-700">
  {#if titleHighlights.length > 0}
    { @const { before, highlight, after } = titleHighlights[0] }
    <span>...{before}</span>
    <mark>{highlight}</mark>
    <span>{after}...</span>
  {:else}
    <span>{title}</span>
  {/if}

  {#if bodyHighlights.length > 0}
    <ul>
      {#each bodyHighlights as hl}
      { @const { before, highlight, after } = hl }
      <li>
        <span>...{before}</span>
        <mark>{highlight}</mark>
        <span>{after}...</span>
      </li>
      {/each}
    </ul>
  {/if}
</div>