<script lang="ts">
  import MD from './MD.svelte';
  import AOS from '$lib/components/AOS.svelte';

  export let item : App.ShowcaseItem;

  $: title = item.title;
  $: description = item.description;
  $: image = item.image;
  $: url = item.url;
  $: excerpt = item.excerpt;
</script>

<AOS as="article" class="rounded-md
  shadow-lg
  m-3 p-6 w-full sm:w-3/4
  justify-self-center self-center
  flex flex-col sm:flex-row 
  items-center bg-tertiary
  hover:animate-bump">
  <div class="mb-3 sm:mb-0 sm:mr-5">
    <a href={url} rel="noopener noreferrer" target="_blank">
      <img class="object-cover h-64 w-64"
        src={image} alt={title} />
    </a>
  </div>

  <div class="text-center w-4/5">
    <div class="text-xl sm:text-2xl lg:text-3xl mb-1 font-display">
      <a href={url} rel="noopener noreferrer" target="_blank">
        <MD md={title} />
      </a>
    </div>

    <div class="font-body">
      <MD md={description} />
    </div>

    {#if excerpt}
    <br />
    <div class="font-body">
      <MD md={excerpt} />
    </div>
    {/if}
  </div>
</AOS>