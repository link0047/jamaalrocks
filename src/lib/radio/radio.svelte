<script>
  import generateId from "$lib/util/local-unique-id-generator.js";
  export let id = generateId("radio");
  export let labelId = undefined;
  export let value = undefined;
  export let checked = false;
  export let required = false;
  export let variant = undefined;
  export let name = "";
</script>

<label class="radio" class:radio--box={variant == "box"} id={labelId} for={id}>
  <input
    class="radio__native-control"
    {id}
    {name}
    required={required || undefined}
    type="radio"
    {value}
    aria-checked={checked}
    aria-labelledby={labelId}
    {checked}
    on:focus
    on:blur
    on:change
  />
  {#if variant != "box"}
    <div class="radio__outer-circle" />
  {/if}
  <div class="radio__content">
    <slot />
  </div>
</label>

<style>
  .radio {
    font-size: 0.875rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    line-height: 1;
    margin: 0;
    cursor: pointer;
  }

  .radio--box {
    box-shadow: inset 0 0 0 2px #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    min-height: 40px;
    transition: box-shadow 0.3s ease;
    padding: 0 8px;
    margin: 0;
  }

  .radio--box:focus,
  .radio--box:hover {
    box-shadow: inset 0 0 0 2px #000;
  }

  .radio__outer-circle {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background-color: #757575;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    vertical-align: middle;
  }

  .radio__outer-circle:before {
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: transform 280ms cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: #fff;
  }

  .radio__outer-circle::after {
    position: absolute;
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 0 0 2px #000;
    top: 1px;
    left: 1px;
    pointer-events: none;
  }

  .radio__native-control {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: inherit;
    z-index: 1;
  }

  .radio__native-control:focus ~ .radio__outer-circle::after,
  .radio__native-control:hover ~ .radio__outer-circle::after {
    opacity: 1;
  }

  .radio__native-control:checked ~ .radio__outer-circle {
    background-color: #285bc7;
  }

  .radio__native-control:checked ~ .radio__outer-circle:before {
    transform: scale(-0.375);
  }

  .radio__native-control:checked:disabled ~ .radio__outer-circle {
    background-color: #eee;
  }

  .radio__native-control:checked:disabled ~ .radio__outer-circle:before {
    background-color: #afafaf;
  }

  .radio__native-control:disabled ~ .radio__outer-circle {
    background-color: #afafaf;
    cursor: not-allowed;
  }

  .radio__native-control:disabled ~ .radio__outer-circle:before {
    background-color: #afafaf;
  }

  .radio__content {
    display: flex;
    align-items: center;
  }
</style>
