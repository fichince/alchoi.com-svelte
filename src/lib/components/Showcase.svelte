<script lang="ts">
  import ShowcaseItem from "./ShowcaseItem.svelte";

  export let items : App.ShowcaseItem[] = [];
</script>

<section class="w-full sm:w-10/12 mx-auto
  flex flex-col">
  {#each items as item, index (index)}
    <ShowcaseItem item={item} />
  {/each}
</section>