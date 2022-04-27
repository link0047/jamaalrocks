<script>
  export let type = 'button';
  export let variant = undefined;
  export let raised = false;
  export let disabled = false;
  export let size = undefined;
 </script>
 <button 
 class="fab"
 class:fab--primary={ variant == 'primary' }
 class:fab--outlined={ variant == 'outlined' }
 class:fab--raised={ raised }
 class:fab--sizeMedium={ size == 'medium' }
 class:fab--sizeSmall={ size == 'small' }
 type={type}
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
:root {
  --x: 0;
  --y: 0;
}

.fab {
  top: var(--y);
  left: var(--x);
  position: absolute;
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
  height: 56px;
  width: 56px;
  padding: 0;
  border: none;
  border-radius: 28px;
  outline: 0;
  background-color: #fff;
  color: #212121;
  overflow: hidden;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none;
  transition: background-color .35s cubic-bezier(.22,.61,.36,1);;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  z-index: 99;
}

.fab:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}

.fab--sizeMedium {
  height: 40px;
  width: 40px;
}

.fab--sizeSmall {
  height: 32px;
  width: 32px;
}
</style>