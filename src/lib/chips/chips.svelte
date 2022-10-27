<script>
  export let label = '';
</script>
<div class="chips" role="grid" aria-label={label}>
  <slot />
</div>
<style>
  .chips {
    display: grid;
    align-items: center;
    position: relative;
    padding: 0px 0 8px;
    grid-template-columns: repeat(auto-fit, minmax(48px, max-content));
    gap: 8px;
  }

  .chips:empty {
    display: none;
  }
</style>