<script lang="ts">
  import MD from '../MD.svelte';
  import Tags from './Tags.svelte';
  import AOS from '$lib/components/AOS.svelte';
  import { DateTime } from 'luxon';

  export let post : App.BlogPost;

  $: slug = post.slug;
  $: title = post.title;
  $: description = post.description;
  $: tags = post.tags;
  $: formattedDate = DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_FULL);

</script>

<AOS class="rounded-md
  shadow-lg
  w-full sm:w-1/2
  m-3 p-5
  bg-tertiary
  hover:scale-y-105
  transition-transform">
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
</AOS>
