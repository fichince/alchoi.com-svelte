<script lang="ts">
  import { marked } from 'marked';

  export let md : string = '';

  let html : string;

  $: html = marked.parse(md.trim());
</script>

<div>{@html html}</div>