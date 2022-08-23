<script lang="ts">

  import Showcase from '$lib/components/Showcase.svelte';
  import type { PageData } from './$types';

  export let data : PageData;

  let prose : any[];
  $: prose = data.prose;

</script>

<div class="mx-auto mb-6 text-center text-accent dark:text-accent-dark font-body text-lg">
  I spend some of my spare time writing fiction and the occasional non-fiction piece. Here are some links to my published works.
</div>

<Showcase items={prose} />
