<script>
  export let disabled = false;
  export let variant = undefined;
</script>
<button 
  type="button" 
  aria-disabled={disabled} 
  class="pagination__control"
  class:pagination__prev={ variant == 'prev' }
  class:pagination__next={ variant == 'next' }
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:blur
  on:focus
>
  <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
    {#if variant == 'prev'}
    <path d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42Z"/>
    {:else if variant == 'next'}
    <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"/>
    {/if}
  </svg>
</button>
<style>
  .pagination__prev {
    grid-area: prev;
  }

  .pagination__next {
    grid-area: next;
  }

  .pagination__control {
    -webkit-tap-highlight-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 48px;
    width: 48px;
    padding: 0;
    /* border: 1px solid #ccc; */
    border: none;
    border-radius: 50%;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: box-shadow .25s cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: inset 0 0 0 1px #ccc;
  }

  .pagination__control:hover,
  .pagination__control:focus {
    transition: box-shadow .25s ease-in-out;
    box-shadow: inset 0 0 0 2px #2451b2;
    /* border-color: #2451b2; */
  }
</style>