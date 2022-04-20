<script>
  export let id = '';
  export let label = ''
</script>
<div id="{id}" role="radiogroup" aria-label="{label}" class="radio-group">
  <slot />
</div>
<style>
.radio-group {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI", "Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji", "Segoe UI Emoji","Segoe UI Symbol";
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
</style>