<script context="module">
  import _data from './products.json';
  import parser from 'ua-parser-js';
  export async function load({ params, session }) {
    const ua = parser(session.userAgent);
    // separate products.json into multiple files
    return {
      props: {
        params,
        data: _data,
        isMobile: ua.device.type === 'mobile' || ua.device.type === 'tablet'
      }
    }
  }
</script>
<script>
  import { onMount, afterUpdate } from 'svelte';
  import { Breadcrumb, Crumb } from '$lib/breadcrumbs';
  import { Select, SelectOption } from '$lib/select';
  import { Chips, Chip } from '$lib/chips';
  import { Collapsible } from '$lib/collapsible';
  import { List, ListItem } from '$lib/list';
  import { Button, Fab } from '$lib/button';
  import Checkbox from '$lib/checkbox';
  import Slider from '$lib/slider';
  import Radio from '$lib/radio/radio.svelte';
  import { Pagination } from '$lib/pagination';
  import { Action } from '$lib/card';
  import { ProductCard } from '$lib/productcard';
  import Drawer from '$lib/drawer/drawer.svelte';
  import { dataStore } from '$lib/store';
  export let params;
  export let isMobile;
  export let data;

  let subCategories = [
    {
      name: "Top Sellers",
      href: "https://www.spencersonline.com/category/tees/top-sellers/pc/3369/4911.uts",
    },
    {
      name: "View All T Shirts",
      href: "https://www.spencersonline.com/category/tees/view-all-t-shirts/pc/3369/4632.uts",
    },
    {
      name: "Steven Rhodes T Shirts",
      href: "https://www.spencersonline.com/category/tees/steven-rhodes-t-shirts/pc/3369/5147.uts",
    },
    {
      name: "Plus Size T Shirts",
      href: "https://www.spencersonline.com/category/tees/plus-size-t-shirts/pc/3369/4631.uts",
    },
    {
      name: "Statement T Shirts",
      href: "https://www.spencersonline.com/category/tees/statement-t-shirts/pc/3369/5043.uts",
    },
    {
      name: "Music & Band T Shirts",
      href: "https://www.spencersonline.com/category/tees/music-band-t-shirts-merch/pc/3369/3382.uts",
    },
    {
      name: "Movie T Shirts",
      href: "https://www.spencersonline.com/category/tees/movie-t-shirts/pc/3369/3399.uts",
    },
    {
      name: "TV T Shirts",
      href: "https://www.spencersonline.com/category/tees/tv-t-shirts/pc/3369/3400.uts",
    },
    {
      name: "Horror T Shirts",
      href: "https://www.spencersonline.com/category/tees/horror-t-shirts/pc/3369/5145.uts",
    },
    {
      name: "Hentai T Shirts",
      href: "https://www.spencersonline.com/category/tees/hentai-t-shirts-merch/pc/3369/5469.uts",
    },
    {
      name: "Anime T Shirts",
      href: "https://www.spencersonline.com/category/tees/anime-t-shirts/pc/3369/3395.uts",
    },
    {
      name: "Funny T Shirts",
      href: "https://www.spencersonline.com/category/tees/funny-t-shirts/pc/3369/3383.uts",
    },
    {
      name: "Tie Dye T Shirts",
      href: "https://www.spencersonline.com/category/tees/tie-dye-t-shirts/pc/3369/4248.uts",
    },
    {
      name: "Button Down Shirts",
      href: "https://www.spencersonline.com/category/tees/button-down-shirts/pc/3369/5042.uts",
    },
    {
      name: "Holiday T Shirts",
      href: "https://www.spencersonline.com/category/tees/holiday-t-shirts/pc/3369/3397.uts",
    },
    {
      name: "Clearance T Shirts",
      href: "https://www.spencersonline.com/category/tees/clearance-t-shirts/pc/3369/3398.uts",
    },
  ];
  const title = params.slug.replace('-',' ');
  // const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAEQCAQAAACXJxk1AAABf0lEQVR42u3RAREAAAQEMN+/rQLkcLYKS09xSpQpQxnKlKEMZcpQhjJlKEOZMpShTBnKUIYyZShDmTKUoUwZylCmDGUoU4YylKFMGcpQpgxlKFOGMpQpQxnKlKEMZcpQhjKUKUMZypShDGXKUIYyZShDmTKUoQxlylCGMmUoQ5kylKFMGcpQpgxlKFOmTBnKUKYMZShThjKUKUMZypShDGXKUIYylClDGcqUoQxlylCGMmUoQ5kylKEMZcpQhjJlKEOZMpShTBnKUKYMZShThjKUoUwZylCmDGUoU4YylClDGcqUoQxlKFOGMpQpQxnKlKEMZcpQhjJlKEOZMmXKUIYyZShDmTKUoUwZylCmDGUoU4YylKFMGcpQpgxlKFOGMpQpQxnKlKEMZShThjKUKUMZypShDGXKUIYyZShDmTKUoQxlylCGMmUoQ5kylKFMGcpQpgxlKEOZMpShTBnKUKYMZShThjKUKUMZypQpU4YylClDGcqUoQxlylCGsk8Wz28RP36goaIAAAAASUVORK5CYII=";

  
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

  const colorMap = new Map([
    ['KELLY GREEN', '#4CBB17'],
    ['CHARCOAL', '#36454F'],
    ['BLACK','#000'],
    ['NAVY','#000080'],
    ['WHITE','#fff'],
    ['TAN','#D2B48C'],
    ['TIE DYE','linear-gradient(to right, orange , yellow, green, cyan, blue, violet)'],
    ['PURPLE','#A020F0'],
    ['LIGHT BLUE','#ADD8E6'],
    ['GREEN','#008000'],
    ['GOLD','#FFD700'],
    ['BLUE','#0000FF'],
    ['GRAY','#808080'],
    ['MINT','#3EB489'],
    ['YELLOW','#FFFF00'],
    ['HEATHER GREY','#9f9d8b'],
    ['PINK','#ffc0cb'],
    ['LIGHT PINK','#ffb6c1'],
    ['MAROON','#800000'],
    ['RED','#FF0000'],
    ['YELLOW AND WHITE','linear-gradient(to right, #ffff00 50%, #fff 50%)'],
    ['ORANGE','#FFA500'],
    ['SAND','#C2B280'],
    ['HEATHER','#a6aac7'],
    ['TEAL','#008080'],
    ['CORAL','#FF7F50'],
    ['SILVER','#C0C0C0'],
  ]);
  let results = 0;
  let pageIdx = 0;
  let filterCount = { color: 0, size: 0 };
  const filters = new Set();
  let sidebarOpen = false;

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

  for (const { page } of data) {
    for(let product of page) {
      for (let variant of product.variants) {  
        sizes.add(variant.size);
        colors.add(variant.color);
      }
    }
    results += page.length;
  }

  const sortedSizes = [...sizes].sort(sortSize);
  
  function handleSizeChange(event) {
    const target = event.target;
    if (target.checked) {
      filters.add(target.value);
      filterCount.size += 1;
    } else {
      filters.delete(target.value);
      filterCount.size -= 1;
    }
    if (filters.size) {
      const filtered = filteredProducts();
      colors.clear();
      for (const product of filtered) {
        for (const variant of product.variants) {
          colors.add(variant.color);
        }
      }

      if (!filterCount.size) {
        results = 0;
        console.log('reset colors');
        colors.clear();
        for (const { page } of data) {
          for(let product of page) {
            for (let variant of product.variants) {  
              colors.add(variant.color);
            }
          }
          results += page.length;
        }
      }

      productColors = [...colors];
      pageIdx = 0;
      results = filtered.length;
      const p = !filtered.length % 24 ? 0 : 1;
      const n = Math.round(filtered.length / 24) + p;
      products = Array.from(Array(n).keys(), i => {
        const start = 24 * i;
        const end = start + 24;  
        return { page: filtered.slice(start, end) };  
      });
    } else {
      results = 0;
      sizes.clear();
      colors.clear();
      for (const { page } of data) {
        for(let product of page) {
          for (let variant of product.variants) {  
            sizes.add(variant.size);
            colors.add(variant.color);
          }
        }
        results += page.length;
      } 
      productColors = [...colors];
      products = data;
    }
    const len = products.length;
    count = len > 1 ? len - 1 : len;
  }

  function handleColorChange(event) {
    const target = event.target;
    if (target.checked) {
      filters.add(target.value);
      filterCount.color += 1;
    } else {
      filters.delete(target.value);
      filterCount.color -= 1;
    }

    if (filters.size) {
      const filtered = filteredProducts();
      pageIdx = 0;
      results = filtered.length;
      productColors = [...colors];
      const p = !filtered.length % 24 ? 0 : 1;
      const n = Math.round(filtered.length / 24) + p;
      products = Array.from(Array(n).keys(), i => {
        const start = 24 * i;
        const end = start + 24;  
        return { page: filtered.slice(start, end) };  
      });
    } else {
      results = 0;
      sizes.clear();
      colors.clear();
      for (const { page } of data) {
        for(let product of page) {
          for (let variant of product.variants) {  
            sizes.add(variant.size);
            colors.add(variant.color);
          }
        }
        results += page.length;
      }

      productColors = [...colors]; 
      products = data;
    }
    const len = products.length;
    count = len > 1 ? len - 1 : len;
  }

  function handleRatingChange({ target }) {
    const { value } = target;
    console.log(value);
  }

  function filteredProducts() {
    const arr = [];
    for (let page of data) {
      for (let product of page.page) {
        if (!product.variants) continue; 
        for (let variant of product.variants) {
          const hasSize = filterCount.size > 0 && filters.has(variant.size);
          const hasColor = filterCount.color > 0 && filters.has(variant.color);
          if (hasSize && hasColor) {
            arr.push(product);
            break;
          } else if (hasSize || hasColor) {
            if (filterCount.size > 0 && filterCount.color > 0) continue;
            arr.push(product);
            break;
          }
        }  
      }  
    }
    return arr;
  }

  afterUpdate(()=> {
    const images = Array.from(document.querySelectorAll('img[loading="lazy"]'));
    images.forEach(img => { 
      img.src = transparentPixel;
      requestAnimationFrame(() => img.src = img.dataset.src);
    });
  });

  onMount(async () => {
    window.__data = data;
  });
  
  $: count = data.length - 1;
  $: productColors = [...colors];
  $: products = data;
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div 
  class="page page--plp"
  class:isMobile= { isMobile }
>
  <Breadcrumb>
    <Crumb>Home</Crumb>
    <Crumb current>{ title }</Crumb>
  </Breadcrumb>
  <div 
    aria-modal="true"
    aria-label="Sort and Filters"
    class="sidebar" 
    class:sidebar--open={sidebarOpen} 
    aria-hidden={isMobile ? !sidebarOpen : undefined}
    role="dialog"
  >
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
          {#each subCategories as category}
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
      <svelte:fragment slot="heading">Size{ filterCount.size > 0 ? ` (${filterCount.size})` : '' }</svelte:fragment>
      <svelte:fragment slot="content">
        <List scrollable grid={2} gap={16}>
          {#each sortedSizes as size}
            <ListItem>
              <Checkbox value={size} variant="box" on:change={handleSizeChange}>
                { size }
              </Checkbox>
            </ListItem>
          {/each}
        </List>
      </svelte:fragment>
    </Collapsible>
    <Collapsible>
      <svelte:fragment slot="heading">Color{ filterCount.color > 0 ? ` (${filterCount.color})` : '' }</svelte:fragment>
      <svelte:fragment slot="content">
        <List grid={4}>
          {#each productColors as color}
            <ListItem>
              <Checkbox checked={filters.has(color)} value={color} color={colorMap.get(color)} variant="swatch" on:change={handleColorChange}>
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
        {#each ['4.0','3.0','2.0','1.0'] as rate, i}
          <Radio name="rating" on:change={handleRatingChange}>
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
            &nbsp;& Up
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
    <p class="browse-header__product-result-count">{Intl.NumberFormat().format(results)} Results</p>
    {#if isMobile}
      <Button variant="rounded" on:click={handleFilterClick}>
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          <path d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.989.989 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75v9.13M7.04 5 11 10.06v5.52l2 2v-7.53L16.96 5H7.04Z"/>
        </svg>
        Sort & Filter
      </Button>
    {:else}
      <Select class="sort" labelText="Sort By" floatLabel>
        <SelectOption value="Top Seller">Top Seller</SelectOption>
        <SelectOption value="Newest">Newest</SelectOption>
        <SelectOption value="Top Rated">Top Rated</SelectOption>
        <SelectOption value="Price - Low to High">Price - Low to High</SelectOption>
        <SelectOption value="Price - High to Low">Price - High to Low</SelectOption>
      </Select>
    {/if}
  </header>
  <main class="content">
    <section class="grid grid--products">
      {#each products[pageIdx].page as product, i}
        <ProductCard product={product} />
      {/each}
    </section>
    <div class="browse-footer">
      <Pagination count={count} page={pageIdx + 1} handleChange={(idx) => pageIdx = idx - 1} />
      <Select labelText="Items Per Page" floatLabel>
        <SelectOption value={24}>24</SelectOption>
        <SelectOption value={48}>48</SelectOption>
      </Select>
    </div>
    <Drawer open={$dataStore.open} position="right">
      <header class="drawer__header">
        <Button class="drawer__close-btn" label="Close Button" on:click={() => { $dataStore.open = false; }}>
          <svg focusable="false" role="presentation" class="icon" viewBox="0 0 24 24">
            <path d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12z" />
          </svg>
          Back
        </Button>
        <h2 id="drawer-0-title" class="drawer__title">Product Detail</h2>
      </header>
      <div class="drawer__content">
        <picture>
          <img alt={$dataStore.panel.name} src={$dataStore.panel.image} decoding="async" class="image" />
        </picture>
        <div class="product-info">
          <p>{$dataStore.panel.name}</p>
          <div class="product-card__price">
            {#if $dataStore.panel.price.sale}
            <div>${$dataStore.panel.price.sale}</div>
            <div style="display:grid;align-items:center;grid-template-columns:max-content max-content;gap:3px">
              <span class="product-card__price-sale strike-through">${$dataStore.panel.price.base}</span>
              <span style="color:#005900;font-size:12px;">{100 - Math.round($dataStore.panel.price.sale / $dataStore.panel.price.base * 100)}% off</span>
            </div>
            {:else}
              {`$${$dataStore.panel.price.base}`}
            {/if}
          </div>
        </div>
        {#if $dataStore.panel.size.length}
        <Select selected="Medium" labelText="Size">
          {#each $dataStore.panel.size as size}
            <SelectOption value={size}>{size}</SelectOption>
          {/each}
        </Select>
        {/if}
        {#if $dataStore.panel.color.length}
        <Select labelText="Color">
          {#each $dataStore.panel.color as color}
            <SelectOption value={color}>{color}</SelectOption>
          {/each}
        </Select>
        {/if}
        <Button variant="commerce">Add to Cart</Button>
      </div>
    </Drawer>
  </main>
</div>
<style>
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
  padding: 8px;
}

.sidebar {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 100vw;
  transform: translate3d(0, 0, 0);
  width: 100vw;
  z-index: 10;
  background-color: #fff;
  overflow: scroll;
  padding: 0;
  will-change: transform;
  transition: transform .3s ease-in-out;
}

.sidebar--open {
  transform: translate3d(-100vw, 0, 0);
  transition: transform .3s ease-in-out;
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

.content {
  width: 100%;
  grid-area: main-content;
}

.rating-stars {
  display: flex;
  flex-flow: row nowrap;
}

.rating-stars .icon{
  width: 20px;
  height: 20px;
}

.browse-footer {
  display: grid;
  grid-template-columns: 1fr 120px;
  column-gap: 16px;
  align-items: center;
  margin-top: 56px;
}

.browse-header {
  display: grid;
  grid-template-columns: 1fr 120px;
  grid-template-rows: 32px 24px;
  grid-template-areas:
    "heading sort"
    "result sort";
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
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 48px;
  margin: 8px 0 0;
}

@media (min-width: 320px) {
  .page--plp {
    grid-template-columns: none;
    grid-template-areas:
    "breadcrumb"
    "browse-header"
    "sidebar"
    "main-content";
  }
}

@media (min-width: 768px) {
  .grid--products {
    grid-template-columns: repeat(3, 1fr);
  }

  .browse-footer {
    column-gap: 32px;
  }
}

@media (min-width: 1088px) {
  .page--plp {
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      "sidebar breadcrumb"
      "sidebar browse-header"
      "sidebar main-content";
    grid-column-gap: 16px;
    grid-template-rows: 32px 56px 1fr;
  }
  .grid--products {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
  }

  .sidebar {
    grid-area: sidebar;
    position: sticky;
    top: 0;
    left: initial;
    height: 100vh;
    width: initial;
    overflow: auto;
  }

  .sidebar__header {
    display: none;
  }

  .browse-footer {
    column-gap: 64px;
  }
}

.drawer__header {
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  background-color: #f5f6f7;
  border-bottom: 1px solid #e5e5e5;
}

.drawer__title {
  font-weight: 500;
  font-size: 20px;
  margin: 0;
  line-height: 1;
  display: flex;
  justify-content: center;
}

.drawer__content {
  padding: 8px;
  display: flex;
  flex-flow: column;
  gap: 8px;
  height: calc(100% - 48px);
  overflow: auto;
}

:global(.drawer .drawer__close-btn) {
  padding: 0;
  margin-left: 4px;
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
</style>