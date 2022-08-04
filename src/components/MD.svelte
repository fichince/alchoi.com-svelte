<script lang="ts">
  import { remark } from 'remark';
  import remarkHtml from 'remark-html';
  import remarkGfm from 'remark-gfm';
  import remarkSmartypants from 'remark-smartypants';

  export let md : string = '';

  $: html = 
      remark()
        .use(remarkHtml, { sanitize: false })
        .use(remarkGfm)
        .use(remarkSmartypants)
        .process(md);

</script>

{#await html then content}
  {@html content}
{/await}