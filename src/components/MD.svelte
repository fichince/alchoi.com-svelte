<script lang="ts">
  import { remark } from 'remark';
  import remarkHtml from 'remark-html';
  import remarkGfm from 'remark-gfm';
  import remarkSmartypants from 'remark-smartypants';

  export let md : string = '';

  let html : string;

  // it is important to run this synchronously
  // it seems that any asynchronous code will "break out"
  // of SvelteKit's prerendering and run like SSR.
  $: html = remark()
      .use(remarkGfm)
      .use(remarkSmartypants)
      .use(remarkHtml, { sanitize: false })
      .processSync(md)
      .toString();

</script>

{@html html}