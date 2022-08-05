<script context="module" lang="ts">
  import type { Load } from './__types/index';
  import MD from '$lib/components/MD.svelte';
  import Tags from '$lib/components/blog/Tags.svelte';
  import { DateTime } from 'luxon';

  export const load : Load = async ({ props }) => {
    const { post: { title } } = props;
    return {
      stuff: {
        pageTitle: title,
      },
      props
    }
  };
</script>

<script lang="ts">
  export let post : App.BlogPost;

  $: description = post.description;
  $: formattedDate = DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_FULL);
  $: content = post.content;
  $: tags = post.tags;

</script>

<div class="mx-auto flex flex-col w-full
  lg:flex-row lg:w-3/4">

  <div class="w-full lg:w-1/3 lg:mr-4 lg:ml-2
    text-center lg:text-right lg:pr-10">
    <div class="mb-2 font-display text-accent text-2xl">
      <MD md={description} />
    </div>
    <div class="uppercase font-display text-accent text-lg">
      {formattedDate}
    </div>
    <div class="mt-2 flex justify-center lg:justify-end">
      <Tags tags={tags} />
    </div>
  </div>

  <hr class="my-4 border-accent" />

  <article class="prose prose-neutral flex-grow 
    font-body text-lg md:text-xl">
    <MD md={content} />
  </article>
</div>