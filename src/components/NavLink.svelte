<script lang="ts">
  export let to : string = '/';
  export let name : string = 'Link';
</script>

<a href={to}>
  <div class="flex-no-grow flex-no-shrink relative p-3 leading-normal text-tertiary font-display 
    no-underline flex items-center hover:bg-tertiary hover:text-accent">
      {name}
  </div>
</a>