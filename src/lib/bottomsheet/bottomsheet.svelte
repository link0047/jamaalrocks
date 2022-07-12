<script>
  export let open = false;
</script>
<aside 
  class="sheet" 
  class:sheet--open={open}
  role="dialog" 
  aria-modal="true"
>
  <slot />
</aside>
<div class="sheet-scrim" on:click={() => open = false}></div>
<style>
  .sheet {
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    left: 0;
    top: 0;
    padding: 8px;
    min-height: 40px;
    min-width: 256px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9;
  }

  .sheet::after {
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

  .sheet--open {
    transform: translate3d(0, 0, 0);
  }

  .sheet--open::after {
    opacity: 1;
  }

  .sheet-scrim {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.32);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 8;
  }

  .sheet--open + .sheet-scrim {
    opacity: 1;
    pointer-events: initial;
  }
</style>