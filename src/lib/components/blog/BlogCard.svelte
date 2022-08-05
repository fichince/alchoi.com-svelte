<script lang="ts">
  import MD from '../MD.svelte';
  import Tags from './Tags.svelte';
  import { DateTime } from 'luxon';
  import { inview } from 'svelte-inview';

  export let post : App.BlogPost;

  let shouldShow : boolean;

  $: slug = post.slug;
  $: title = post.title;
  $: description = post.description;
  $: tags = post.tags;
  $: formattedDate = DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_FULL);

  const handleChange = (event : any) => {
    const { detail: { inView } } = event;
    shouldShow = inView;
  };

</script>

<div class="rounded-md
  shadow-lg
  w-full sm:w-1/2
  m-3 p-5
  bg-tertiary
  hover:scale-y-105
  transition-transform"
  use:inview 
  on:change={handleChange} 
  class:show={shouldShow}
  class:hide={!shouldShow}>
  <a href={`/blog/${slug}`}>
    <div class="text-2xl text-accent font-display">
      <MD md={title} />
    </div>
    <hr class="border-accent my-3" />
    <div class="flex justify-between text-accent font-body items-baseline">
      <MD md={description} />
      <span class="ml-5 min-w-fit">{formattedDate}</span>
    </div>
  </a>
  <div class="mt-2">
    <Tags tags={tags} />
  </div>
</div>

<style lang="postcss">
  .hide {
    @apply opacity-0 transition-opacity duration-1000;
  }
  .show {
    @apply opacity-100 transition-opacity duration-1000;
  }
</style>