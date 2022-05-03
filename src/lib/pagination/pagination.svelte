<script>
  import Paginationitem from "./paginationitem.svelte";
  import Controls from "./controls.svelte";
  export let count = 1;
  export let displayCount = 7;
  export let page = 1;
  export let handleChange;

  function handleClick(page) {
    handleInternalChange(page);  
  }

  function next() {
    if (page >= count) return;
    page += 1;

    items = generateItems();
    handleChange(page);
  }

  function prev() {
    if (page <= 1) {
      page = 1;
      return;
    } 
    page -= 1;

    items = generateItems();
    handleChange(page);
  }

  function handleInternalChange(value) {
    page = value;
    items = generateItems();
    handleChange(value);
  }

  function generateItems() {
    if (count <= displayCount) {
      return Array.from(Array(count).keys(), i => i + 1);
    }

    return Array.from(Array(displayCount).keys(), i => {
      if (i == 0) return 1;
      if (i == 1) {
        if (page > startEllipisBoundary) return '...';
      }
      if (i == displayCount - 2) {
        if (page < endEllipisBoundary) return '...';  
      }  
      if (i == displayCount - 1) return count;
      return page > endEllipisBoundary ? endEllipisBoundary + (i - 3) : page > startEllipisBoundary ? page + (i - 3) : i + 1;  
    });
  }

  const startEllipisBoundary = displayCount - 3;
  const endEllipisBoundary = count - 3;
  $: items = generateItems();
</script>
<nav aria-labelledby="pagination-heading" class="pagination">
  <div aria-live="polite" role="status" class="pagination__status">
    <h2 class="a11y-hide" id="pagination-heading">Results Pagination - Page {page}</h2>
  </div>
  <Controls variant="prev" on:click={prev} />
  <ol class="pagination__list">
    {#each items as item}
      <Paginationitem on:click={handleClick.bind(null, item)} disabled={ item == '...' || undefined } current={item == page}>{item}</Paginationitem>
    {/each}
  </ol>
  <Controls variant="next" on:click={next} />
</nav>
<style>
  .pagination {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    grid-template-areas:
      "status status status"
      "prev list next";
    column-gap: 16px;
    line-height: 1;
    align-items: center;
    justify-content: center;
  }

  .pagination__status {
    grid-area: status;
  }

  .pagination__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    grid-area: list;
  }
</style>