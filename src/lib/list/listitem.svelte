<li 
  class="list__item" 
  {...$$restProps}
>
  <slot />
</li>
<style>  
.list__item {
  position: relative;
  flex: 1 1 auto;
  padding: 0 8px;
  min-height: 36px;
  display: grid;
  align-items: center;
  border-radius: 4px;
}

.list__item:hover {
  background-color: #f6f6f7;
}

:global(.list--grid) .list__item {
  padding: 0;
}

:global(.list--nohover) .list__item:hover {
  background-color: transparent;
}

:global(.list--sizeSmall) .list__item {
  min-height: 24px;
}
</style>