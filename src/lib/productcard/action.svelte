<script>
  import InputStepper from "$lib/inputstepper";
  export let count = 0;
  export let label = undefined;
  function handleProductAdd() {
    count += 1;
  }

  function handleChange(val) {
    if (val == 0) {
      count = 0;
    }
  }
</script>
<div class="product__action">
  {#if count == 0}
    <button 
      class="btn--addtocart" 
      type="button" 
      aria-label={label} 
      on:focus
      on:blur
      on:click={handleProductAdd}
    >
      <svg class="icon"focusable="false" role="presentation" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Add
    </button>
  {:else}
    <InputStepper change={handleChange} />
  {/if}
</div>
<style>
  .product__action {
    position: absolute;
    left: 4px;
    bottom: 4px; 
  }

  .btn--addtocart {
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
    height: 40px;
    padding: 0 8px;
    border: none;
    color: #fff;
    border-radius: 20px;
    outline: 0;
    background-color: #0071dc;
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
  }

  .icon {
    fill: #fff;
    width: 20px;
    height: 20px;
  }
</style>