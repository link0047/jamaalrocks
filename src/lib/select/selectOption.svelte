<script>
  import { afterUpdate, getContext, onDestroy, onMount } from "svelte";
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
  
  afterUpdate(() => {
    console.log('update', $ctx);
  }); 

  onDestroy(() => {
    console.log('dead');
  });
</script>
<option
  value={value || ''}
  selected={selected}
  hidden={hidden}
  disabled={disabled}
>
  <slot/>
</option>