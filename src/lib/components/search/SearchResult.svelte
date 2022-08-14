<script lang="ts">
  import take from 'lodash/take';

  import type { Index } from 'lunr';
  import { stripMarkdown, extractHighlights } from '$lib/utils';

  export let result : Index.Result;
  export let post : App.BlogPost;

  const markClasses = 'bg-inherit font-extrabold font-pop italic';

  let titleHighlights : App.Highlight[] = [];
  let bodyHighlights : App.Highlight[] = [];

  $: {
    const metadata = Object.values(result.matchData.metadata)?.[0] as App.SearchResultMetadata;
    titleHighlights = extractHighlights(post?.title || '', metadata?.title, true);
    bodyHighlights = take([
      ...extractHighlights(post?.description || '', metadata?.description),
      ...extractHighlights(post?.content || '', metadata?.content),
    ], 3)
  }

  $: title = stripMarkdown(post.title);
  $: url = `/blog/${post.slug}`;

</script>

<a href={url}>
  <div class="p-2 mb-2 border rounded-md border-gray-400
    hover:border-pop hover:shadow-md hover:animate-bump-small flex flex-col">
    <span class="text-lg font-display">
      {#if titleHighlights.length > 0}
        { @const { before, highlight, after } = titleHighlights[0] }
        {before}
        <mark class={markClasses}>{highlight}</mark>
        {after}
      {:else}
        {title}
      {/if}
    </span>

    {#if bodyHighlights.length > 0}
      <ul class="text-gray-600 text-base list-disc list-inside font-body">
        {#each bodyHighlights as hl}
        { @const { before, highlight, after } = hl }
        <li>
          ...{before}
          <mark class={markClasses}>{highlight}</mark>
          {after}...
        </li>
        {/each}
      </ul>
    {/if}
  </div>
</a>