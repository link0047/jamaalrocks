<script>
  export let value = 1;
  export let change = () => {};

  function handleClick(val) {
    value += val;
    change(value);
  }
</script>
<div 
  class="stepper"
  {...$$restProps}
>
  <button 
    class="stepper__action" 
    type="button" 
    aria-label="Minus"
    on:focus
    on:blur
    on:click={handleClick.bind(null,-1)}
  >
    <svg class="icon"focusable="false" role="presentation" viewBox="0 0 24 24">
      <path d="M19 13H5v-2h14v2z"/>
    </svg>
  </button>
  <span class="stepper__value">{value}</span>
  <button 
    class="stepper__action" 
    type="button" 
    aria-label="Minus" 
    on:focus
    on:blur
    on:click={handleClick.bind(null, 1)}
  >
    <svg class="icon"focusable="false" role="presentation" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  </button>
</div>
<style>
  .stepper {
    background-color: #0071dc;
    display: grid;
    grid-template-columns: 32px minmax(32px, max-content) 32px;
    width: max-content;
    height: 40px;
    border-radius: 20px;
    padding: 0 4px;
    align-items: center;
    gap: 2px;
  }

  .stepper__value {
    display: inline-flex;
    line-height: 1;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    cursor: text;
  }

  .stepper__action {
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
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
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
    cursor: pointer;
  }

  .stepper__action:focus,
  .stepper__action:hover {
    background-color: #004f9a;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #fff;
  }
</style>