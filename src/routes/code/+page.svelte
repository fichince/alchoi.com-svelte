<script lang="ts">
  import Showcase from '$lib/components/Showcase.svelte';
import type { PageData } from './$types';
  export let data : PageData;

  let code : any[];
  $: code = data.code;

</script>

<div class="mx-auto mb-6 text-center text-accent dark:text-accent-dark font-body text-lg">
  Websites and applications that I've worked on.
</div>

<Showcase items={code} />