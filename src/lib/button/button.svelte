<script>
 export let type = 'button';
 export let variant = 'default';
 export let raised = false;
 export let disabled = false;
 export let size = undefined;
 export let label = undefined;
 export let el = undefined;
 export let rounded = false;
 let clazz = undefined;
  export { clazz as class };
  const css = clazz ? ` ${clazz}` : '';
</script>
<button 
  bind:this={el}
  class={`btn${css}`}
  class:btn--primary={ variant == 'primary' }
  class:btn--outlined={ variant == 'outlined' }
  class:btn--commerce={ variant == 'commerce' }
  class:btn--icon={ variant == 'icon' }
  class:btn--rounded={ rounded }
  class:btn--raised={ raised }
  class:btn--sizeSmall={ size == 'small'}
  class:btn--sizeLarge={ size == 'large'}
  type={type}
  aria-label={label}
  disabled={disabled}
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:blur
  on:focus
>
  <slot/>
</button>
<style>
.btn {
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
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  outline: 0;
  background-color: transparent;
  overflow: hidden;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none;
  gap: 4px;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn--sizeSmall {
  height: 32px;
}

.btn--icon {
  padding: 0;
  min-width: 32px;
  transition: transform .3s ease-in;
}

.btn--rounded {
  box-shadow: inset 0 0 0 2px #000;
  border-radius: 18px;
  padding: 0 12px;
}


.btn--raised {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn--raised:hover, .btn--raised:focus {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}

.btn:not(:disabled) {
  color: #212121;
  background-color: transparent;
}

.btn:hover {
  cursor: pointer;
}

.btn--commerce:not(:disabled) {
  background-color: #008a00;
  color: #fff;
}

.btn--commerce:focus,
.btn--commerce:hover {
  background-color: #006e00;
}

.btn.btn--primary {
  background-color: #2a508f;
  color: #fff;
}

.btn--rounded.btn--primary {
  box-shadow: inset 0 0 0 2px #1D3864;
}
</style>