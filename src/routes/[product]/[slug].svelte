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
        isMobile: ua.device.type === 'mobile'
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
    ['YELLOW AND WHITE','linear-gradient(to right, #ffff00 50%, #fff)'],
    ['ORANGE','#FFA500'],
    ['SAND','#C2B280'],
    ['HEATHER','#a6aac7'],
    ['TEAL','#008080'],
    ['CORAL','#FF7F50'],
    ['SILVER','#C0C0C0'],
  ]);
  let results = 0;
  let pageIdx = 6;
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
      products = data;
    }
    count = products.length - 1;
  }

  function handleColorChange(event) {
    const target = event.target;
    if (target.checked) {
      filters.add(target.value.toLowerCase());
      filterCount.color += 1;
    } else {
      filters.delete(target.value.toLowerCase());
      filterCount.color -= 1;
    }
    if (filters.size) {
      pageIdx = 0;
      const filtered = filteredProducts();

      const p = !filtered.length % 24 ? 0 : 1;
      const n = Math.round(filtered.length / 24) + p;
      products = Array.from(Array(n).keys(), i => {
        const start = 24 * i;
        const end = start + 24;  
        return { page: filtered.slice(start, end) };  
      });
    } else {
      products = data;
    }
    count = products.length - 1;
  }

  function filteredProducts() {
    const arr = [];
    for (let page of data) {
      for (let product of page.page) {
        if (!product.variants) continue; 
        for (let variant of product.variants) {
          const hasSize = filterCount.size > 0 && filters.has(variant.size);
          const hasColor = filterCount.color > 0 && filters.has(variant.color.toLowerCase());
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
<div class=" page page--plp">
  <Breadcrumb>
    <Crumb>Home</Crumb>
    <Crumb current>{ title }</Crumb>
  </Breadcrumb>
  <div class="sidebar" class:sidebar--open={sidebarOpen} aria-hidden={isMobile ? !sidebarOpen : undefined}>
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
              <Checkbox value={color} color={colorMap.get(color)} variant="swatch" on:change={handleColorChange}>
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
      {#each products[pageIdx].page as product, i}
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
            <source media="(max-width: 560px)" srcset={product.image}/>
            <img class="image lazyload" width="217" height="272" src={transparentPixel} data-src={product.image} alt={product.name} decoding="async" loading="lazy" />
          </picture>
          <div class="product-card__name">
            {product.name}
            <Button variant="icon" size="small">
              <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
                <path d="m12.1 18.55-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5 22 5.41 19.58 3 16.5 3Z"/>
              </svg>
            </Button>  
          </div>
          <div class="product-card__price">
            {`$${product.price.base}`}
            {#if product.price.sale}
              <div class="product-card__price-sale">$<span class="strike-through">{`${product.price.sale}`}</span></div>
            {/if}
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
                        <linearGradient id={`grad-${i}-${j}`}>
                          <stop offset={`${product.rating.split('.')[1]}0%`} stop-color="#000"></stop>
                          <stop offset={`${product.rating.split('.')[1]}0%`} stop-color="#fff"></stop>
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
      <Pagination count={count} page={pageIdx + 1} handleChange={(pageIdx) => products = products[pageIdx - 1]} />
      <Select labelText="Items Per Page" floatLabel>
        <SelectOption value={24}>24</SelectOption>
        <SelectOption value={48}>48</SelectOption>
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

@media (max-width: 768px) {
  .browse-footer {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
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
  grid-template-columns: 1fr min-content;
}

.strike-through {
  text-decoration: line-through;
}

.product-card__price {
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0 0;
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
  margin: 8px 0 0;
}
:global(.btn) .icon,
.product-card .icon {
  width: 20px;
  height: 20px;
}
</style>

