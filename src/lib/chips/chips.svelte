<script>
  export let label = '';
</script>
<div class="chips" role="grid" aria-label={label}>
  <slot />
</div>
<style>
  .chips {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: relative;
    padding: 0px 0 8px;
    gap: 8px;
  }

  .chips:empty {
    display: none;
  }
</style>