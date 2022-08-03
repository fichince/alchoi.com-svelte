<script context="module" lang="ts">
  import type { Load } from './__types/prose';

  export const load: Load = async ({ props }) => {
    return {
      stuff: {
        pageTitle: 'Prose'
      },
      props
    };
  };
</script>

<script lang="ts">
  import Showcase from '../components/Showcase.svelte';
  export let prose : any[];
</script>

<div class="mx-auto mb-6 text-center font-body text-lg">
  I spend some of my spare time writing fiction and the occasional non-fiction piece. Here are some links to my published works.
</div>

<Showcase items={prose} />
