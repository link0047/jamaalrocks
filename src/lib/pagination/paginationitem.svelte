<script>
  export let current = false;
  export let href = undefined;
  export let title = undefined;
  export let disabled = false;
</script>
<li>
  <a class="pagination__item"
    href="{href}" 
    title="{title}"
    disabled={ disabled || undefined }
    aria-current="{current ? 'page' : undefined}"
    on:click
    on:focus
    on:blur>
    <slot />
    {#if current} 
      <span class="a11y-hide"> - current page</span>
    {/if}
  </a>
</li>
<style>
  .pagination__item:visited,
  .pagination__item {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-decoration: none;
    color: #212121;
  }
  
  .pagination__item[aria-current="page"],
  .pagination__item:focus {
    box-shadow: inset 0 0 0 2px #2451b2;
    color: #15306a;
  }

  .pagination__item:not([disabled]):hover {
    background-color: #f2f2f2;
  }
</style>