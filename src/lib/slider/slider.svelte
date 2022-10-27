<script>
  // export let multithumb = false;
  export let min = 0;
  export let max = 10;
  export let value = 0;
  export let prefix = '';
  export let label = '';

  let railRef;

  function action(node, params) {
    let x = 0;
    let move = 0;
    let railRect;
    let thumbRect;
    
    function handleMouseLeave (event) {  
      if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {  
        console.log("I'm out");  
      }
    }

    function handleMouseDown(event) {
      railRect = params.getBoundingClientRect();
      thumbRect = node.getBoundingClientRect();

      x = event.clientX;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // document.addEventListener("mouseleave", handleMouseLeave);
    }

    function handleMouseMove(event) {
      const currentX = event.clientX;
      console.log('x values', { move, x, currentX });
      move += currentX - x;
      // console.log('move', move);
      if (move <= 0) {
        console.log('you shall not pass');
        move = 0;
        node.style.cssText = `transform:translate3d(${move}px,-50%,0)`;
        return;
      }

      if (move >= (Math.round(railRect.width) - (thumbRect.width))) {
        console.log(thumbRect)
        move = Math.round(railRect.width) - (thumbRect.width);
        node.style.cssText = `transform:translate3d(${move}px,-50%,0)`;
        return;
      }
      
      node.style.cssText = `transform:translate3d(${move}px,-50%,0)`;
      x = currentX;
    }

    function handleMouseUp(event) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    node.addEventListener('mousedown', handleMouseDown);
    return {
      update(new_params) {
        params = new_params;
      },
      destroy() {
        node.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }
</script>
<div class="silder">
  <div class="rail-label">{`${prefix}${min}`}</div>
  <div class="rail" bind:this={railRef}>
    <button
      use:action={railRef}
      type="button"
      role="slider"
      class="rail__thumb"
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={`${prefix}${value}`}
      aria-valuemax={max}
      aria-label={label}
    ></button>
    <button
      use:action={railRef}
      type="button"
      role="slider"
      class="rail__thumb"
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={`${prefix}${value}`}
      aria-valuemax={max}
      aria-label={label}
    ></button>
  </div>
  <div class="rail-label">{`${prefix}${max}`}</div>
</div>
<style>
  .silder {
    position: relative;
    display: grid;
    grid-template-columns: minmax(24px, auto) 1fr minmax(24px, auto);
    height: 32px;
    align-items: center;
    gap: 4px;
  }
  
  .rail-label {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rail {
    position: relative;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, rgb(144, 145, 150) 0%, rgb(144, 145, 150) 0%, rgb(0, 113, 220) 0%, rgb(0, 113, 220) 71.1111%, rgb(144, 145, 150) 71.1111%, rgb(144, 145, 150) 100%);
    border-radius: 2px;
  }

  .rail:before,
  .rail:after {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgb(144, 145, 150);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .rail:after {
    right: 0
  }

  .rail__thumb {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 0;
    border: 1px dash #285bc7;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: 1px dashed #285bc7;
    cursor: pointer;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  .rail__thumb:before {
    content: '';
    width: 24px;
    height: 24px;
    display: block;
    background-color: #285bc7;
    border-radius: 50%;
  }
</style>