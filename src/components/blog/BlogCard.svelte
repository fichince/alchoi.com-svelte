<script lang="ts">
  import MD from '../MD.svelte';
  import { DateTime } from 'luxon';

  export let post : App.BlogPost;

  const { slug, title, description, date } = post;

  const formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);

</script>

<div class="rounded-md
  shadow-lg
  w-full sm:w-1/2
  m-3 p-5
  bg-tertiary
  hover:scale-y-105
  transition-all">
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
    <!--<Tags tags={tags} />-->
  </div>
</div>