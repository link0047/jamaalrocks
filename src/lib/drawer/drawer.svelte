<script>
  import { browser } from '$app/environment';
  import { afterUpdate } from 'svelte';
  export let open = false;
  export let position = "left";

  $: if (browser) {
    if (open) { document.body.style.cssText = 'overflow:hidden' } 
    else { document.body.style.cssText = '' }
  }
</script>
<aside 
  class="drawer" 
  class:drawer--open={open}
  class:drawer--position-right={position == 'right'}
  role="dialog" 
  aria-modal="true"
>
  <slot />
</aside>
<div 
  class="drawer-scrim" 
  on:click={() => open = false}
  on:keydown
>
</div>
<style>
  .drawer {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
  }

  @media (min-width: 561px) {
    .drawer {
      max-width: 376px;
    }
  }

  .drawer--position-right {
    left: unset;
    right: 0;
    transform: translate3d(100%, 0, 0);
  }

  .drawer::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%),
      0 6px 30px 5px rgb(0 0 0 / 12%);
  }

  .drawer--open {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    pointer-events: initial;
  }

  .drawer--open::after {
    opacity: 1;
  }

  .drawer-scrim {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.32);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 998;
  }

  .drawer--open + .drawer-scrim {
    opacity: 1;
    pointer-events: initial;
  }
</style>