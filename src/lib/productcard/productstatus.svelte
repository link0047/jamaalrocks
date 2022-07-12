<script>
  export let store = "";
  export let availibility = 0;
  const availibilityText = [
    "In Stock",
    "Low Stock",
    "Out of Stock",
    "Unavailable"
  ];
</script>
<div class="product__store-status">
  <svg
    class="icon"
    class:icon--low-stock={availibility == 1}
    class:icon--unavailable={availibility > 1}
    viewport="0 0 24 24"
    role="presentation"
    focusable="false"
  >
    {#if availibility == 1}
    <linearGradient id="low-0" x1="0" x2="0" y1="0" y2="1">
      <stop offset="45%" stop-color="transparent" />
      <stop offset="45%" stop-color="#ffa524" />
    </linearGradient>
    {/if}
    <circle cx="50%" cy="50%" r="4.5" fill={availibility == 1 ? 'url(#low-0)' : undefined} />
  </svg>
  {availibilityText[availibility]} at {store}
</div>
<style>
  .product__store-status {
    display: flex;
    font-size: 12px;
    line-height: 1;
    align-items: center;
    margin: 4px 0 0;
  }

  .product__store-status .icon {
    width: 22px;
    height: 22px;
    fill: #0a8a00;
    stroke: #0a8a00;
    stroke-width: 2;
    margin-right: 4px;
  }

  .product__store-status .icon--low-stock {
    stroke: #ffa524;
  }

  .product__store-status .icon--unavailable {
    fill: transparent;
    stroke: #e00751;
  }
</style>