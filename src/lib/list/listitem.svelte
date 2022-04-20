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
</style>