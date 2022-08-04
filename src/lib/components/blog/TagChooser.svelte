<script lang="ts">
  import reduce from 'lodash/reduce';
  import countBy from 'lodash/countBy';
  import sortBy from 'lodash/sortBy';
  import cs from 'classnames';

  export let selectedTag : string;
  export let posts : App.BlogPost[] = [];

  const liClasses = `
    before:mx-1 before:content-['⋅'] 
    last:after:content-['⋅'] last:after:mx-1
    text-accent
  `;

  $: allTags = 
      reduce<App.BlogPost, string[]>(posts, (memo, post) => (
        [ ...memo, ...(post?.tags || []) ]
      ) , []);

  $: counts = countBy(allTags);

  $: tags = sortBy(Object.keys(counts));

</script>

<ul class="font-display flex flex-wrap">
  {#each tags as tag (tag)}
  {@const selected = selectedTag === tag}
    <li class={liClasses}> 
      <span class={cs('underline', { 'italic font-bold text-pop': selected })}>
        <a href={`/blog/tag/${tag}`}>
          {tag}
        </a>
      </span>
      <span class="ml-1 text-xs">({counts[tag]})</span>
    </li>
  {/each}
  <li class={liClasses}>
    <span class="underline">
      <a href="/blog">all</a>
    </span>
  </li>
</ul>
