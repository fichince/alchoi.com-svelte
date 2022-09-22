<script lang="ts">
  import type { PageData } from './$types';
  import { DateTime } from 'luxon';
  import { fade } from 'svelte/transition';
  import MD from '$lib/components/MD.svelte';
  import Tags from '$lib/components/blog/Tags.svelte';

  export let data : PageData;

  $: post = data.post;

  $: formattedDate = DateTime.fromISO(post.date).toUTC().toLocaleString(DateTime.DATE_FULL);
  $: ({ description, content, tags } = post);

</script>

<div class="mx-auto flex flex-col w-full
  lg:flex-row lg:w-3/4" in:fade>

  <div class="w-full lg:w-1/3 lg:mr-4 lg:ml-2
    text-center lg:text-right lg:pr-10">
    <div class="mb-2 font-display text-accent dark:text-accent-dark text-2xl">
      <MD md={description} />
    </div>
    <div class="uppercase font-display text-accent dark:text-accent-dark text-lg">
      {formattedDate}
    </div>
    <div class="mt-2 flex justify-center lg:justify-end">
      <Tags tags={tags} animate />
    </div>
  </div>

  <hr class="my-4 border-accent dark:border-accent-dark" />

  <article class="prose prose-neutral dark:prose-invert flex-grow 
    font-body text-lg md:text-xl">
    <MD md={content} />
  </article>
</div>
