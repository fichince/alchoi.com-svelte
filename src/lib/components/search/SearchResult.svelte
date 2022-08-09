<script>
  import each from 'lodash/each';

  export let result;
  export let post;

  $: console.log('search result', result.ref);

  $: {
    const { matchData: { metadata } } = result;
    const titleMatches = data.title;
    each(metadata, (data) => {
      each(data, (value, key) => {

        const str = post[key];
        const { position } = value;

        each(position, (pos) => {
          const [ start, length ] = pos;
          const sub = str.substring(
            Math.max(0, start - 10), 
            Math.min(start + length + 10, str.length)
          );
          console.log(`found in ${key}`, pos, sub);
        });

      });

    });

  }

</script>