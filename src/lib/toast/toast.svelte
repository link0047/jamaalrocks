<script>
  let isOpen = false;
  export function open() {
    isOpen = true;
  }

  export function close() {
    isOpen = false;
  }
</script>
<aside 
  class="toast"
  class:toast--open={ isOpen }
  role="status"
  aria-relevant="additions"
>
  <div class="toast__label" aria-atomic="false">
    <slot />
  </div>
  {#if $$slots.actions}
  <div class="toast__actions" aria-atomic="true">
    <slot name="actions" />
  </div>
  {/if}
</aside>
<style>
  .toast {
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: 3px;
    font-size: .875rem;
    font-weight: 400;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    bottom: 8px;
    left: 8px;
    background-color: #333;
    color: #fff;
    padding: 8px 24px;
    will-change: transform;
    transform: translate3d(0, calc(100% + 8px),0);
    transition: transform 280ms cubic-bezier(0.645, 0.045, 0.355, 1), opacity 300ms;
    opacity: 0;
    pointer-events: none;
  }

  .toast--open {
    opacity: 1;
    pointer-events: initial;
    transform: translate3d(0,0,0);
  }

</style>