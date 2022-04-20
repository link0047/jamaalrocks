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
    padding: 8px 0;
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    gap: 8px;
  }
</style>