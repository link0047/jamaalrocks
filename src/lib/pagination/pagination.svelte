<script>
  import Paginationitem from "./paginationitem.svelte";
  import Controls from "./controls.svelte";
</script>
<nav aria-labelledby="pagination-heading" class="pagination">
  <div aria-live="polite" role="status" class="pagination__status">
    <h2 class="a11y-hide" id="pagination-heading">Results Pagination - Page 1</h2>
  </div>
  <Controls variant="prev" />
  <ol class="pagination__list">
    <slot />
    <Paginationitem disabled>...</Paginationitem>
    <Paginationitem>49</Paginationitem>
  </ol>
  <Controls variant="next" />
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