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
  $: formattedDate = DateTime.fromISO(post.date).toUTC().toLocaleString(DateTime.DATE_FULL);

</script>

<AOS class="rounded-md
  shadow-lg
  shadow-accent/30
  dark:shadow-accent-dark/10
  w-full sm:w-1/2
  m-3 p-5
  bg-tertiary
  dark:bg-tertiary-dark
  hover:animate-bump">
  <a href={`/blog/${slug}`}>
    <div class="text-2xl text-accent dark:text-accent-dark font-display">
      <MD md={title} />
    </div>
    <hr class="border-accent dark:border-accent-dark my-3" />
    <div class="flex justify-between text-accent dark:text-accent-dark font-body items-baseline">
      <MD md={description} />
      <span class="ml-5 min-w-fit">{formattedDate}</span>
    </div>
  </a>
  <div class="mt-2">
    <Tags tags={tags} />
  </div>
</AOS>
