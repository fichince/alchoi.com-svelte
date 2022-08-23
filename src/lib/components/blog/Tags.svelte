<script lang="ts">
  export let tags : string[] = [];
  export let animate : boolean = false;
</script>

<div class="flex">
  {#each tags as tag (tag)}
    <div class="mr-1 last:mr-0">
      <a href={`/blog/tag/${tag}`}>
        <div class="py-0.5 px-1 text-xs 
          border-accent text-accent
          dark:border-accent-dark dark:text-accent-dark
          hover:bg-accent hover:text-primary
          dark:hover:bg-accent-dark dark:hover:text-primary-dark
          border rounded-md"
          class:hover:animate-bump-small={animate}>
          {tag}
        </div>
      </a>
    </div>
  {/each}
</div>