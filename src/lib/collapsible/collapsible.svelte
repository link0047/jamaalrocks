<script>
  import Separator from "$lib/separator/separator.svelte";
  export let open = false;
  const id = 'collapsible-1'//generateId('collapsible');
  const disclosureID = `${id}-disclosure`;
  function handleClick() {
    open = !open;
  }
</script>
<button 
  id={disclosureID} 
  class="collapsible-disclosure"
  aria-controls={id} 
  aria-expanded={open}
  on:click={handleClick}
  on:click
>
  <slot name="heading" />
  <svg class="icon" role="presentation" focusable="false" viewBox="0 0 24 24">
    <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"/>
  </svg>
</button>
<div 
  id={id} 
  class="collapsible" 
  class:collapsible--open={open}
  role="region" 
  tabindex="-1" 
>
  <slot name="content" />
</div>
<Separator variant="short" spacing={0} />
<style>
  .collapsible-disclosure {
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: grid;
    grid-template-columns: 1fr 32px;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 48px;
    padding: 0 0 0 16px;
    margin: 0;
    text-align: left;
    border: none;
    border-radius: 8px;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .collapsible-disclosure[aria-expanded="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .collapsible-disclosure[aria-expanded="true"] .icon {
    transition: transform .15s linear;
    transform: rotate(180deg);
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .collapsible-disclosure:hover {
    border-color: #000;
    box-shadow: inset 0 0 0 2px #000;
    cursor: pointer;
  }

  .collapsible-disclosure:focus {
    border-color: #3367d6 #285bc7 #2451b2;
    box-shadow: inset 0 0 0 2px #2451b2;
  }

  .collapsible {
    display: none;
    padding: 8px;
  }

  .collapsible--open {
    display: block;
  }
</style>
