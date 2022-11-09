<script>
  export let variant = undefined;
  export let size = undefined;
  export let inline = false;
  export let scrollable = false;
  export let grid = undefined;
  export let gap = undefined;
  export let rowGap = undefined;
  export let colWidth = undefined;

  let gridCol = grid ? `--col:${Number.isInteger(grid) ? `${grid}` : grid};` : '';
  let gridGap = gap ? `--gap:${Number.isInteger(gap) ? `${gap}px` : gap};` : '';
  let gridRowGap = rowGap ? `--row-gap:${Number.isInteger(rowGap) ? `${rowGap}px` : rowGap};` : '';
  let gridColWidth = colWidth ? `--col-width:${colWidth}` : '';
  let style = `${gridCol}${gridGap}${gridRowGap}${gridColWidth}`;
</script>
<ol 
  class="list" {...$$restProps}
  class:list--inline={ inline }
  class:list--indented={ variant == 'indented' }
  class:list--underlined={ variant == 'underlined'}
  class:list--sizeSmall={ size == 'small' }
  class:list--sizeLarge={ size == 'large' }
  class:list--scrollable={ scrollable }
  class:list--grid={ grid }
  {...$$restProps}
  style={ style.length ? style : undefined }
>
  <slot />
</ol>
<style>
:root{
  --col: 2;
  --col-width: 1fr;
  --gap: 8px;
  --row-gap: 8px;
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

.list--inline {
  display: flex;
  flex-flow: row wrap;
}

.list--inline :global(.list__item) {
  padding: 0;
  flex: 0 0 auto;
}

.list--grid {
  grid-template-columns: repeat(var(--col), var(--col-width));
  gap: var(--gap);
  row-gap: var(--row-gap);
}

.list--indented {
  padding-left: 16px;
}

.list--scrollable {
  max-height: 320px;
  overflow-y: auto;
}
</style>