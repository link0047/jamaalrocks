<script>
  import { getContext, onMount } from "svelte";
  export let value = undefined;
  export let hidden = undefined;
  export let disabled = undefined;
  export let selected = undefined;
  const ctx = getContext('select');
  
  onMount(() => {
    if (selected && $ctx && $ctx !== value) {
      $ctx = value;
    }

    if ($ctx && $ctx == value) selected = true;
  });
  
</script>
<option
  value="{value}"
  selected="{selected}"
  hidden="{hidden}"
  disabled="{disabled}"
>
  <slot/>
</option>