<script>
import { afterUpdate } from "svelte";
  export let id = '';
  export let labelId = '';
  export let name = undefined;
  export let value = undefined;
  export let required = false;
  export let size = undefined;
  export let variant = undefined;
  export let checked = false;
  export let color = 'transparent';
  // separate swatch and box variant to their own respective components
  const blackCheck = `--icon-fill:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='black'%3e%3cpath d='M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7Z'/%3e%3c/svg%3e")`;
  let iconColor = '';
  afterUpdate(async () => {
    iconColor = (color.toLowerCase() == '#fff') ? blackCheck : '';
  });
</script>
<div 
  class="checkbox"
  class:checkbox--sizeSmall={ size == 'small' }
  class:checkbox--box={ variant == 'box' }
  class:checkbox--swatch={ variant == 'swatch' }
  class:checkbox--card={ variant == 'card' }
  style={ variant == 'swatch' ? `--swatch-color: ${color};${iconColor}` : undefined }
  on:blur
  on:focus
  on:change
>
  <input class="checkbox__native-control" {id} {name} type="checkbox" {value} aria-labelledby={labelId} required={required || undefined} {checked}>
  <label id={labelId} class="checkbox__label" for="{id}">
    <slot />
  </label>
</div>
<style>
:root {
  --icon-fill: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='white'%3e%3cpath d='M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7Z'/%3e%3c/svg%3e");
}
.checkbox {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  position: relative;
  margin: 0;
  cursor: pointer;
}

.checkbox__native-control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: inherit;
  opacity: 0;
}

:not(.checkbox--box):not(.checkbox--swatch) .checkbox__native-control:checked + .checkbox__label:before {
  background-color: #4877da;
  background-image: var(--icon-fill);
  box-shadow: inset 0 0 0 2px #000;
}

.checkbox__native-control:focus + .checkbox__label:before,
.checkbox__native-control:hover + .checkbox__label:before {
  box-shadow: inset 0 0 0 2px #000;
}

.checkbox__label {
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
}

:not(.checkbox--swatch):not(.checkbox--box) .checkbox__label:before {
  content: '';
  width: 20px;
  height: 20px;
  display: block;
  box-shadow: inset 0 0 0 2px #0000008a;
  margin-right: 8px;
  border-radius: 4px;
  background-size: 16px;
  background-position: center;
}

:not(.checkbox--swatch):not(.checkbox--box) .checkbox--sizeSmall .checkbox__label:before {
  width: 16px;
  height: 16px;
  background-size: 12px;
}

.checkbox--box .checkbox__label {
  box-shadow: inset 0 0 0 2px #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  min-height: 40px;
  transition: box-shadow .3s ease;
}

.checkbox--box:focus .checkbox__label,
.checkbox--box:hover .checkbox__label {
  box-shadow: inset 0 0 0 2px #000;
}

.checkbox--box .checkbox__native-control:checked + .checkbox__label {
  background-color: #000;
  color: #fff;
  box-shadow: none;
}

.checkbox--swatch {
  display: grid;
  align-items: center;
}

.checkbox--swatch .checkbox__label:before {
  background: var(--swatch-color);
  content: '';
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #ccc;
  margin-top: 1px;
}

.checkbox--swatch .checkbox__native-control:checked + .checkbox__label:before {
  background-image: var(--icon-fill);
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: inset 0 0 0 2px #000;
}

.checkbox--swatch .checkbox__label {
  display: flex;
  flex-flow: column;
  letter-spacing: 0.04em;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
}
</style>