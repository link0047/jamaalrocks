<script>
  export let variant = undefined;
  export let size = undefined;
  export let scrollable = false;
</script>
<ol 
  class="list" {...$$restProps}
  class:list--indented={ variant == 'indented' }
  class:list--sizeSmall={ size == 'small' }
  class:list--sizeLarge={ size == 'large' }
  class:list--scrollable={scrollable}
  {...$$restProps}
>
  <slot />
</ol>
<style>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  gap: 4px;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.list--indented {
  padding-left: 16px;
}

.list--scrollable {
  max-height: 320px;
  overflow-y: auto;
}
</style>