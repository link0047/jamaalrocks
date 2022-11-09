<script>
  export let variant = 'standard';
  export let fullWidth = false;
  export let rounded = false;
  export let id = null;
  // export let size = undefined;
  export let name = null;
  export let required = false;
  export let readonly = false;
  export let min = null;
  export let max = null;
  export let inputRef = null;
  export let labelText = '';
  export let value = '';
  export let placeholder = null;
  export let type = 'text';
  export let afterChange = () => {}

  function debounce(fn, time) {
    let timeoutId

    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    function wrapper(...args) {
      cancel()
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }

    wrapper.cancel = cancel

    return wrapper
  }

  console.log($$slots.leftIcon);

  const handleKeyup = debounce(e => {
    afterChange(e.target.value);
  }, 300);
</script>
<div 
  class="textfield"
  class:textfield--fullWidth={ fullWidth }
  class:textfield--rounded={ rounded }
  class:textfield--outline={variant === 'outline'}
  class:textfield--filled={variant === 'filled'}
  class:textfield--box={variant === 'box'}
  class:textfield--hasIcon={$$slots.leftIcon || $$slots.rightIcon}
  >
  <label id="" class="textfield__label" for="">{labelText}</label>
  <slot name="leftIcon" />
  <input
    bind:this="{inputRef}"
    class="textfield__native-control"
    id="{id}"
    name="{name}"
    required="{required}"
    readonly="{readonly}"
    aria-labelledby=""
    aria-errormessage=""
    aria-invalid="false"
    minlength="{min}"
    maxlength="{max}"
    placeholder="{placeholder}"
    type="{type}"
    value="{value ?? ''}"
    {...$$restProps}
    on:click
    on:change
    on:input
    on:keydown
    on:keyup="{handleKeyup}"
    on:focus
    on:blur
    on:mouseover
    on:mouseenter
    on:mouseleave
    >
    <slot name="rightIcon" />
  <div class="textfield__message" aria-live="assertive" id="" role="alert"></div>
</div>
<style>
.textfield {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  transition: border 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: border, box-shadow;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px
}

.textfield__label {
  font-size: 1rem;
  line-height: 1;
  margin: 0 0 4px
}

.textfield__label:empty {
  margin: 0;
}

.textfield__label,
.textfield__native-control,
.textfield__message {
  flex: 0 0 100%;
}

.textfield__native-control {
  outline: none;
  color: #212121;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.04em;
  width: 100%;
  height: 36px;
  padding: 0 8px;
  border: none;
  background: none;
  font-size: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.textfield--hasIcon .textfield__native-control {
  width: calc(100% - 32px);
  flex: 0 0 calc(100% - 32px);
}

.textfield--hasIcon :global(.icon) {
  margin: 6px 4px;
}

.textfield--outline {
  border: 1px solid;
  border-color: #949499;
  border-radius: 4px;
}

.textfield--outline:hover {
  border-color: #000;
  box-shadow: inset 0 0 0 1px #000;
}

.textfield--outline:focus-within {
  border-color: #3367d6 #285bc7 #2451b2;
  box-shadow: inset 0 0 0 1px #2451b2;
}

.textfield--box {
  border: 1px solid;
  border-color: #212121;
  border-radius: 4px;
}

.textfield--box .textfield__label {
  font-size: 12px;
  margin: 4px 4px 0
}

</style>