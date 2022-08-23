<script context="module" lang="ts">
  import type { Load } from './__types/index';

  export const load: Load = async ({ props }) => {
    return {
      stuff: {
        pageTitle: 'Code'
      },
      props
    };
  };
</script>

<script lang="ts">
  import Showcase from '$lib/components/Showcase.svelte';
  export let code : any[];
</script>

<div class="mx-auto mb-6 text-center text-accent dark:text-accent-dark font-body text-lg">
  Websites and applications that I've worked on.
</div>

<Showcase items={code} />