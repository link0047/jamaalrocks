<script>
  export let variant = 'filled';
  export let size = 'medium';
  export let onDelete = null;
  export let rounded = false;
</script>
<div 
  class="chip"
  class:chip--sizeSmall={ size == 'small' }
  class:chip--outlined={ variant == 'outlined' }
  class:chip--rounded={ rounded }
  role="row">
  {#if $$slots.avatar}
    <div role="gridcell">
      <slot name="avatar"></slot>
    </div>
  {/if}
  <div role="gridcell">
    <slot />
  </div>
  {#if onDelete}
    <div role="gridcell">
      <button type="button" tabindex="-1" aria-label="Remove">
        <svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
        </svg>
      </button>
    </div>
  {/if}
</div>
<style>
.chip {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 0.8125rem;
  color: #000000de;
  font-weight: 500;
  letter-spacing: .0178571429em;
  height: 32px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  outline: none;
  padding: 4px;
  border-radius: 4px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  appearance: none;
  cursor: pointer;
}

.chip--outlined {
  background-color: #fff;
  border: 2px solid #bdbdbd;
}

.chip--sizeSmall {
  height: 24px;
  font-size: 14px;
}

.chip--rounded {
  padding: 0 16px;
  border-radius: 16px;
}

.chip--sizeSmall.chip--rounded {
  padding: 0 12px;
  border-radius: 12px;
}
</style>