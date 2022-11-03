<script>
  import { Chip } from '../chips';
  import { Button } from '../button';
  import Action from './action.svelte';
  import { generateId } from './util';
  import Productstatus from './productstatus.svelte';
  
  // make transparent
  const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAEQCAQAAACXJxk1AAABf0lEQVR42u3RAREAAAQEMN+/rQLkcLYKS09xSpQpQxnKlKEMZcpQhjJlKEOZMpShTBnKUIYyZShDmTKUoUwZylCmDGUoU4YylKFMGcpQpgxlKFOGMpQpQxnKlKEMZcpQhjKUKUMZypShDGXKUIYyZShDmTKUoQxlylCGMmUoQ5kylKFMGcpQpgxlKFOmTBnKUKYMZShThjKUKUMZypShDGXKUIYylClDGcqUoQxlylCGMmUoQ5kylKEMZcpQhjJlKEOZMpShTBnKUKYMZShThjKUoUwZylCmDGUoU4YylClDGcqUoQxlKFOGMpQpQxnKlKEMZcpQhjJlKEOZMmXKUIYyZShDmTKUoUwZylCmDGUoU4YylKFMGcpQpgxlKFOGMpQpQxnKlKEMZShThjKUKUMZypShDGXKUIYyZShDmTKUoQxlylCGMmUoQ5kylKFMGcpQpgxlKEOZMpShTBnKUKYMZShThjKUKUMZypQpU4YylClDGcqUoQxlylCGsk8Wz28RP36goaIAAAAASUVORK5CYII=";
  const id = generateId();
  const rating = [1,2,3,4,5];
  const ratingPrefix = `rating-grad-${id}`;

  export let product = {
    image: transparentPixel,
    name: '',
    badge: null,
    rating: null,
    price: {
      base: null,
      sale: null,
    }
  };
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function isEmpty(str) {
    return (!str || str.length === 0 );
  }
</script>
<div class="card product-card">
  <picture class="card__media">
    <source media="(max-width: 560px)" srcset={product.image}/>
    <img class="image lazyload" width="217" height="272" src={transparentPixel} data-src={product.image} alt={product.name} decoding="async" loading="lazy" />
    <Action count={0} variant="commerce" data={product} />
  </picture>
  {#if !isEmpty(product.badge)}
    <Chip size="small">{product.badge}</Chip>
  {/if}
  <div class="product-card__name">
    {product.name}
  </div>
  <div class="product__info">
    <div class="product-card__price">
      {#if product.price.sale}
      <div>${product.price.sale}</div>
      <div style="display:grid;align-items:center;grid-template-columns:max-content max-content;gap:3px">
        <span class="product-card__price-sale strike-through">${product.price.base}</span>
        <span style="color:red;font-size:12px;">{100 - Math.round(product.price.sale / product.price.base * 100)}% Off</span>
      </div>
      {:else}
        {`$${product.price.base}`}
      {/if}
    </div>
    <Button variant="icon" size="small">
      <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>
      </svg>
    </Button> 
  </div>
  {#if +product.rating > 0} 
    <div class="product-card__rating">
      {#each rating as j}
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          {#if +product.rating >= j}
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
          {:else}
            {#if !Number.isInteger(+product.rating) && (+product.rating + 1) > j}
              <defs>
                <linearGradient id={`${ratingPrefix}-${j}`}>
                  <stop offset={`${product.rating.split('.')[1]}0%`} stop-color="#000"></stop>
                  <stop offset={`${product.rating.split('.')[1]}0%`} stop-color="#fff"></stop>
                  <stop offset={`${(10 - +product.rating.split('.')[1])}0%`} stop-color="#fff"></stop>
                </linearGradient>
              </defs>
              <path fill={`url(#${ratingPrefix}-${j})`} d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
              <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
            {:else}
              <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
            {/if}
          {/if}
        </svg>
      {/each} 
    </div>
  {/if}
  <div class="promos">
    <div class="promo">Buy 1 Get 1 $5</div>
    <div class="promo">Buy 1 Get 1 $1</div>
  </div>
  <Productstatus store="Egg Harbor Twp, NJ" availibility={randomInt(1,10) > 5 ? 1 : 0 }/>
</div>
<style>
.image {
  width: 100%;
  height: auto;
  display: block;
}
.card {
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  overflow: hidden;
  position: relative;
}

.card__media {
  position: relative;
  display: block;
  height: auto;
  background-color: #f2f2f2;
  overflow: hidden;
  border-radius: 4px;
  animation: loading 1s 5;
}

@keyframes loading {
  0% {
    background-color: rgba(242,242,242,1);
  }
  50% {
    background-color: rgba(242,242,242,.5);
  }
  100% {
    background-color: rgba(242,242,242,1);
  }
}

.product-card {
  cursor: pointer;
  overflow: initial;
}

.product-card :global(.chip) {
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 6px!important;
  border-top-right-radius: 0!important;
  border-bottom-left-radius: 0px!important;
  border-bottom-right-radius: 4px!important;
  background-color: #2a508f;
  color: #fff;
}

.product-card::after {
  content: '';
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  box-shadow: 0 0 0 4px #666;
  transform: translate(-4px, -4px);
  border-radius: 4px;
  transition: opacity .15s ease;
}

@media (min-width: 561px) {
  .product-card:hover::after {
    opacity: 1;
  }
}

.product-card__name {
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0 0;
  line-height: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
}

.product__info {
  display: grid;
  grid-template-columns: 1fr 32px;
  align-items: center;
}

.strike-through {
  text-decoration: line-through;
}

.product-card__price {
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: flex-end;
  gap: 4px;
}

.product-card__price-sale {
  color: #4d4a4f;
  font-size: 12px;
}

.product-card__rating {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 14px;
  line-height: 1;
}

.promos {
  display: flex;
  gap: 8px;
  flex-flow: row wrap;
  margin: 8px 4px;
}

.promo {
  background-color: #e7eef8;
  color: #182e52;
  font-size: 14px;
  font-weight: 500;
  width: max-content;
  padding: 0 8px;
  min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  border-radius: 4px;
  box-shadow: 0 0 1px #182e52;
}

.product-card :global(.btn--icon) {
  transition: transform .3s ease-in-out;
}

.product-card :global(.btn--icon):hover {
  transform: scale(1.3);
}

.product-card :global(.btn--icon):hover :global(.icon) {
  stroke: #ff2052;
}

:global(.btn) .icon,
.product-card .icon {
  width: 20px;
  height: 20px;
}

:global(.btn--icon) .icon {
  fill: transparent;
  stroke: #212121;
  stroke-width: 2;
  width: 18px;
  height: 18px;
}
</style>