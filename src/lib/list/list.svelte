<script>
  export let variant = undefined;
  export let size = undefined;
  export let scrollable = false;
  export let grid = undefined;
  export let gap = undefined;

  let gridCol = Number.isInteger(grid) ? `--col:${grid};` : '';
  let gridGap = Number.isInteger(gap) ? `--gap:${gap}px;` : '';
  let style = `${gridCol}${gridGap}`;
</script>
<ol 
  class="list" {...$$restProps}
  class:list--indented={ variant == 'indented' }
  class:list--underlined={ variant == 'underlined'}
  class:list--sizeSmall={ size == 'small' }
  class:list--sizeLarge={ size == 'large' }
  class:list--scrollable={ scrollable }
  class:list--grid={ Number.isInteger(grid) }
  {...$$restProps}
  style={ style.length ? style : undefined }
>
  <slot />
</ol>
<style>
:root{
  --col: 2;
  --gap: 8px;
}
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 4px;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.list--grid {
  grid-template-columns: repeat(var(--col), 1fr);
  gap: var(--gap);
  row-gap: 8px;
}

.list--indented {
  padding-left: 16px;
}

.list--scrollable {
  max-height: 320px;
  overflow-y: auto;
}
</style>