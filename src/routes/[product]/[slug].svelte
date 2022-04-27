
<script>
  import { onMount } from 'svelte';
  import { Breadcrumb, Crumb } from '$lib/breadcrumbs';
  import { Select, SelectOption } from '$lib/select';
  import { Chips, Chip } from '$lib/chips';
  import { Collapsible } from '$lib/collapsible';
  import { List, ListItem } from '$lib/list';
  import { Button, Fab } from '$lib/button';
  import Checkbox from '$lib/checkbox';
  import Slider from '$lib/slider';
  import Radio from '$lib/radio/radio.svelte';
  import { Pagination, PaginationItem } from '$lib/pagination';

  export let slug;
  export let data;

  const title = slug.replace('-',' ');
  const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const sizes = new Set();
  const colors = new Set();
  const rating = [1,2,3,4,5];
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

  let sidebarOpen = false;
  let isMobile = false;

  function noop(event) {
    event.preventDefault();
  }

  function isEmpty(str) {
    return (!str || str.length === 0 );
  }

  function sortSize(a,b) {
    return sizeScorer[a.toLowerCase()] - sizeScorer[b.toLowerCase()];
  }

  function handleFilterClick() {
    if (sidebarOpen) {
      sidebarOpen = false;
      document.body.removeAttribute('style');
    } else {
      sidebarOpen = true;
      document.body.style.cssText = 'overflow:hidden';
    }
  }

  for (const product of data.products) {
    for (let variant of product.variants) {  
      sizes.add(variant.size);
      colors.add(variant.color);
    } 
  }

  const sortedSizes = [...sizes].sort(sortSize);

  onMount(async () => {
    isMobile = window.matchMedia('(max-width: 600px)').matches;
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => img.src = img.dataset.src);
    } else {
      // Dynamically import the LazySizes library
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      script.setAttribute('integrity','sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==');
      script.setAttribute('crossorigin','anonymous');
      script.setAttribute('referrerpolicy','no-referrer');
      document.body.appendChild(script);
    }
  });
</script>
<div class=" page page--plp">
  <Breadcrumb>
    <Crumb>Home</Crumb>
    <Crumb current>{ title }</Crumb>
  </Breadcrumb>
  <div class="sidebar" aria-hidden={!sidebarOpen}>
    {#if isMobile}
      <header class="sidebar__header">
        <div class="sidebar__header-title">
          <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
            <path d="M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4v2Z"/>
          </svg>
          Sort & Filter
        </div>
        <Button variant="icon" on:click={handleFilterClick}>
          <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
          </svg>
        </Button>
      </header>
    {/if}
    <Collapsible open>
      <svelte:fragment slot="heading">Category</svelte:fragment>
      <svelte:fragment slot="content">
        <List scrollable>
          {#each data.subCategories as category}
            <ListItem>
              <a class="link" href={category.href}>{category.name}</a>
            </ListItem>
          {/each}
        </List>
      </svelte:fragment>
    </Collapsible>
    {#if isMobile}  
      <Collapsible>
        <svelte:fragment slot="heading">Sort</svelte:fragment>
        <svelte:fragment slot="content">
          <Radio name="sort" checked>Top Seller</Radio>
          <Radio name="sort">Newest</Radio>
          <Radio name="sort">Top Rated</Radio>
          <Radio name="sort">Price - Low to High</Radio>
          <Radio name="sort">Price - High to Low</Radio>
        </svelte:fragment>
      </Collapsible>
    {/if}
    <Collapsible>
      <svelte:fragment slot="heading">Size</svelte:fragment>
      <svelte:fragment slot="content">
        <List scrollable grid={2} gap={16}>
          {#each sortedSizes as size}
            <ListItem>
              <Checkbox variant="box">
                { size }
              </Checkbox>
            </ListItem>
          {/each}
        </List>
      </svelte:fragment>
    </Collapsible>
    <Collapsible>
      <svelte:fragment slot="heading">Color</svelte:fragment>
      <svelte:fragment slot="content">
        <List grid={4}>
          {#each [...colors] as color}
            <ListItem>
              <Checkbox color={color} variant="swatch">
                { color }
              </Checkbox>
            </ListItem>
          {/each}
        </List>
      </svelte:fragment>
    </Collapsible>
    <Collapsible>
      <svelte:fragment slot="heading">Price</svelte:fragment>
      <svelte:fragment slot="content">
        <Slider prefix="$" min={0} max={250}></Slider>
      </svelte:fragment>
    </Collapsible>
    <Collapsible>
      <svelte:fragment slot="heading">Rating</svelte:fragment>
      <svelte:fragment slot="content">
        {#each ['5.0','4.0','3.0','2.0','1.0'] as rate, i}
          <Radio name="rating">
            <div class="rating-stars">
              {#each rating as j}
                <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
                  {#if +rate >= j}
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
                  {:else}
                    {#if !Number.isInteger(+rate) && (+rate + 1) > j}
                      <defs>
                        <linearGradient id={`rad-${i}-${j}`}>
                          <stop offset={`${rate.split('.')[1]}0%`} stop-color="#000"></stop>
                          <stop offset={`${(10 - +rate.split('.')[1])}0%`} stop-color="#fff"></stop>
                        </linearGradient>
                      </defs>
                      <path fill={`url(#rad-${i}-${j})`} d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
                      <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
                    {:else}
                      <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
                    {/if}
                  {/if}
                </svg>
              {/each}
            </div>
          </Radio>
        {/each} 
      </svelte:fragment>
    </Collapsible>
    <Collapsible>
      <svelte:fragment slot="heading">Shop my store</svelte:fragment>
      <svelte:fragment slot="content">
        <Checkbox>
          See what's available at Egg Hbr Twp
        </Checkbox>
      </svelte:fragment>
    </Collapsible>
  </div>
  <header class="browse-header">
    <h1 class="page__title">{ title }</h1>
    <p class="browse-header__product-result-count">1,080 Results</p>
    {#if isMobile}
      <Button variant="rounded" on:click={handleFilterClick}>
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          <path d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.989.989 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75v9.13M7.04 5 11 10.06v5.52l2 2v-7.53L16.96 5H7.04Z"/>
        </svg>
        Sort & Filter
      </Button>
    {:else}
      <Select class="sort" labelText="Sort By" floatLabel>
        <SelectOption>Top Seller</SelectOption>
        <SelectOption>Newest</SelectOption>
        <SelectOption>Top Rated</SelectOption>
        <SelectOption>Price - Low to High</SelectOption>
        <SelectOption>Price - High to Low</SelectOption>
      </Select>
    {/if}
  </header>
  <main class="content">
    <!-- <section class="filter">
      <header class="filter__header">
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          <path d="M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4v2Z"/>
        </svg>
        All filters (5)
      </header>
      <Chips>
        {#each [...Array(5).keys()] as i, j}
          <Chip variant="outlined" size="small">
            <div slot="avatar" class="avatar">J</div>
            {j}
          </Chip>
        {/each}
      </Chips>
    </section> -->
    <section class="grid grid--products">
    {#each data.products as product, i}
      <div class="card product-card">
        <Fab size="small" style="--x:calc(100% - 40px);--y:8px">
          <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
            <path d="m12.1 18.55-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5 22 5.41 19.58 3 16.5 3Z"/>
          </svg>
        </Fab>  
        <picture class="card__media">
          {#if !isEmpty(product.badge)}
          <Chip size="small" rounded>{product.badge}</Chip>
          {/if}
          <source media="(max-width: 560px)" srcset={product.imageUrl}/>
          <img class="image lazyload" width="217" height="272" src={transparentPixel} data-src={product.imageUrl} alt={product.name} decoding="async" loading="lazy" />
        </picture>
        <div class="product-card__name">{product.name}</div>
        <div class="product-card__price">{product.price.base}</div>
        {#if +product.rating > 0} 
          <div class="product-card__rating">
            {#each rating as j}
              <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
                {#if +product.rating >= j}
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
                {:else}
                  {#if !Number.isInteger(+product.rating) && (+product.rating + 1) > j}
                    <defs>
                      <linearGradient id={`grad-${i}-${j}`}>
                        <stop offset={`${product.rating.split('.')[1]}0%`} stop-color="#000"></stop>
                        <stop offset={`${(10 - +product.rating.split('.')[1])}0%`} stop-color="#fff"></stop>
                      </linearGradient>
                    </defs>
                    <path fill={`url(#grad-${i}-${j})`} d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
                    <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
                  {:else}
                    <path d="m12 15.39-3.76 2.27.99-4.28-3.32-2.88 4.38-.37L12 6.09l1.71 4.04 4.38.37-3.32 2.88.99 4.28M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24Z"/>
                  {/if}
                {/if}
              </svg>
            {/each} 
          </div>
        {/if}
      </div>
    {/each}
    </section>
    <div class="browse-footer">
      <Pagination>
        <PaginationItem on:click={noop} href={'/1'} current>1</PaginationItem>
        <PaginationItem on:click={noop} href={'/2'}>2</PaginationItem>
        <PaginationItem on:click={noop} href={'/3'}>3</PaginationItem>
        <PaginationItem on:click={noop} href={'/4'}>4</PaginationItem>
        <PaginationItem on:click={noop} href={'/5'}>5</PaginationItem>
        <PaginationItem on:click={noop} href={'/6'}>6</PaginationItem>
      </Pagination>
      <Select labelText="Items Per Page" floatLabel>
        <SelectOption>24</SelectOption>
        <SelectOption>48</SelectOption>
      </Select>
    </div>
  </main>
</div>
<style>
.rating-stars {
  display: flex;
  flex-flow: row nowrap;
}
.rating-stars .icon{
  width: 20px;
  height: 20px;
}
.link {
  text-decoration: none;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
  color: #444;
  font-size: .875rem;
  font-weight: 500;
}

.link:focus,
.link:hover {
  color: #000;
  /* text-decoration: underline; */
}

.image {
  width: 100%;
  height: auto;
  display: block;
}

.page__title {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
  grid-area: heading;
}

.page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 400;
  line-height: 1.4em;
  font-size: 16px;
  direction: ltr;
  background-color: #fff;
  unicode-bidi: embed;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-synthesis: none;
  font-feature-settings: "liga", "kern";
}

.page--plp {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "sidebar breadcrumb"
    "sidebar browse-header"
    "sidebar main-content";
  grid-column-gap: 16px;
  padding: 8px;
}



.sidebar {
  grid-area: sidebar;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
}

@media (max-width: 560px) {
  .page--plp {
    grid-template-columns: none;
    grid-template-areas:
    "breadcrumb"
    "browse-header"
    "sidebar"
    "main-content";
  }

  .sidebar {
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    transform: translate3d(100%, 0, 0);
    width: 100vw;
    z-index: 10;
    transition: transform .3s ease-in-out;
    background-color: #fff;
    overflow: scroll;
    padding: 0;
  }

  .sidebar[aria-hidden="false"] {
    transform: translate3d(0, 0, 0);
  }

  .sidebar__header {
    display: grid;
    grid-template-columns: 1fr minmax(36px, auto);
    justify-content: center;
    align-items: center;
    height: 56px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #ccc;
    padding: 8px;
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .sidebar__header-title {
    display: flex;
    align-items: center;
  }
}

.content {
  grid-area: main-content;
}

.filter {
  /* border-top: 1px solid #21212140;
  border-bottom: 1px solid #21212140; */
  margin-bottom: 8px;
}

.filter__header {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 4px;
  align-items: center;
  height: 24px;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
}

.filter__header .icon {
  width: 20px;
  height: 20px;
}

.browse-footer {
  display: grid;
  grid-template-columns: 1fr 120px;
  column-gap: 64px;
  align-items: center;
  margin-top: 56px;
}

.browse-header {
  display: grid;
  grid-template-columns: 1fr 120px;
  grid-template-rows: 1fr 24px;
  grid-template-areas:
    "heading sort"
    "result sort";
  margin: 8px 0 16px;
  grid-area: browse-header;
  align-items: center;
}

.browse-header__product-result-count {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 14px;
  line-height: 1;
  color: #646266;
  grid-area: result;
  align-self: center;
}

.browse-header :global(.sort) {
  grid-area: sort;
  align-self: center;
  margin: 0;
}

.grid {
  display: grid;
}

.grid--products {
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  row-gap: 48px;
}

@media (max-width: 560px) {
  .grid--products {
    grid-template-columns: repeat(2, 1fr);
  }
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
  border-radius: 4px;
  overflow: hidden;
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

:global(.product-card .chip) {
  position: absolute;
  bottom: 0;
  left: 0;
  border-top-left-radius: 0!important;
  border-bottom-left-radius: 4px!important;
  border-bottom-right-radius: 0!important;
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

.product-card:hover::after {
  opacity: 1;
}


.product-card__name {
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0 0;
  line-height: 1;
}

.product-card__price {
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0 0;
  line-height: 1;
}

.product-card__rating {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  margin: 8px 0 0;
}
:global(.btn) .icon,
.product-card .icon {
  width: 20px;
  height: 20px;
}
</style>

