<script lang="ts">
  export let result;

  console.log('here', result.item.title);

  $: {
    result.matches.forEach((match) => {
      const { key, value, indices } = match;

      indices.forEach((index) => {
        const [ first, second ] = index;
        const sub = value.substring(Math.max(0, first - 10), Math.min(second + 10, value.length));
        console.log('index', index, sub);
      });


    });
  }

</script>