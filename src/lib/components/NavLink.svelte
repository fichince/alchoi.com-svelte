<script lang="ts">
  export let to : string = '/';
  export let name : string = 'Link';
</script>

<a href={to}>
  <div class="flex-no-grow flex-no-shrink relative p-3 leading-normal text-tertiary dark:text-tertiary-dark font-display 
    no-underline flex items-center 
    hover:bg-tertiary dark:hover:bg-tertiary-dark
    hover:text-accent dark:hover:text-accent-dark">
      {name}
  </div>
</a>