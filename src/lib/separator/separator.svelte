<script>
  export let spacing = undefined;
  export let variant = undefined;
</script>
<hr 
  class="separator" 
  class:separator--short={ variant == 'short' }
  style={ isNaN(spacing) ? null : `--spacing:${spacing}px` }
>
<style>
  :root {
    --spacing: 4px;
  }

  .separator {
    padding: 0;
    margin: var(--spacing) 0;
    border: solid #21212140;
    border-width: 0px 0px 1px;
    height: 0;
    width: auto;
  }

  .separator--short {
    margin: var(--spacing) auto;
    width: calc(100% - 16px);
  }
</style>