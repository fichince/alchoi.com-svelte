<script lang="ts">
  export let tags : string[] = [];
</script>

<div class="flex">
  {#each tags as tag (tag)}
    <div class="mr-1 last:mr-0">
      <a href={`/blog/tag/${tag}`}>
        <div class="py-0.5 px-1 text-xs 
          border-accent text-accent
          hover:bg-accent hover:text-gray-300
          border rounded-md">
          {tag}
        </div>
      </a>
    </div>
  {/each}
</div>