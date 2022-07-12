<script>
  import InputStepper from "$lib/inputstepper";
  import { dataStore } from '$lib/store';
  export let count = 0;
  export let label = undefined;
  export let variant = undefined;
  export let data = {};

  const sizeArr = [];
  const colorArr = [];

  const sizeScorer = {
    "xs": 0,
    "small": 1,
    "medium": 2,
    "large": 3,
    "xl": 4,
    "xxl": 5,
    "2x": 6,
    "3x": 7
  };

  function sortSize(a,b) {
    return sizeScorer[a.toLowerCase()] - sizeScorer[b.toLowerCase()];
  }

  for (let i = 0; i < data.variants.length; i++) {
    const { color, size } = data.variants[i];

    if (color && !colorArr.includes(color)) {
      colorArr.push(color);
    }

    if (size && !sizeArr.includes(size)) {
      sizeArr.push(size);
    }
  }

  sizeArr.sort(sortSize);

  function handleProductAdd() {
    // count += 1;
    $dataStore.open = true;
    $dataStore.panel = {
      name: data.name,
      image: data.image,
      size: sizeArr,
      color: colorArr,
      price: data.price
    }
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
      class:commerce={ variant == 'commerce' }
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
    <InputStepper change={handleChange} variant={variant} />
  {/if}
</div>
<style>
  .product__action {
    position: absolute;
    left: 4px;
    bottom: 4px; 
  }

  .btn--addtocart {
    transition: background-color .3s ease-in;
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
    padding: 0 12px;
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

  .btn--addtocart.commerce {
    background-color: #008a00;
  }

  .btn--addtocart.commerce:focus,
  .btn--addtocart.commerce:hover {
    background-color: #006e00;
  }

  .icon {
    fill: #fff;
    width: 20px;
    height: 20px;
  }
</style>