<script>
  export let current = false;
  export let href = undefined;
  export let title = undefined;
</script>
<li class="breadcrumbs__crumb">
  <a 
    class="breadcrumbs__link" 
    href="{href}" 
    title="{title}" 
    aria-current="{current ? 'page' : undefined}"
    on:click
    on:focus
    on:blur
  >
    <slot />
  </a>
</li>
<style>
.breadcrumbs__crumb {
  display: flex;
  font-size: .875rem;
  color: #212121;
  text-transform: capitalize;
}

.breadcrumbs__crumb:not(:last-child):after {
  content:'/';
  margin: 0 8px
}

.breadcrumbs__link {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: 0
}

.breadcrumbs__link,
.breadcrumbs__link:visited {
  color: #6f6f6f
}

a.breadcrumbs__link:hover {
  color: #285bc7;
  text-decoration: underline
}

[aria-current=page].breadcrumbs__link,
[aria-current=page].breadcrumbs__link:visited{
  color: #212121;
  cursor: default
}
</style>