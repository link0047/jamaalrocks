<script>
  // export let multithumb = false;
  export let min = 1;
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
    console.log('init thumb')
    
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
  <div class="range-label">{`$${min} - $${max}`}</div>
  <div class="rail" bind:this={railRef}>
    <button
      use:action={railRef}
      type="button"
      role="slider"
      class="rail__thumb rail__thumb--left"
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
      class="rail__thumb rail__thumb--right"
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={`${prefix}${value}`}
      aria-valuemax={max}
      aria-label={label}
    ></button>
  </div>
  <div class="rail-label min">{`${prefix}${min}`}</div>
  <div class="rail-label max">{`${prefix}${max}`}</div>
</div>
<style>
  .silder {
    position: relative;
    display: grid;
    grid-template-areas:
      "range range" 
      "rail rail"
      "min max";
    align-items: center;
    row-gap: 16px;
  }

  .range-label {
    color: #2e2f32;
    font-size: 16px;
    font-weight: 700;
    grid-area: range;
    text-align: center;
  }
  
  .rail-label {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-weight: 500;
    font-size: 14px;
    margin-top: 4px;
  }

  .rail {
    position: relative;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, rgb(144, 145, 150) 0%, rgb(144, 145, 150) 50px, rgb(0, 113, 220) 50px, rgb(0, 113, 220) 71.1111%, rgb(144, 145, 150) 71.1111%, rgb(144, 145, 150) 100%);
    border-radius: 2px;
    grid-area: rail;
  }

  .min {
    grid-area: min;
    text-align: left;
  }

  .max {
    grid-area: max;
    text-align: right;
  }

  .rail:before,
  .rail:after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
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
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  .rail__thumb:focus,
  .rail__thumb:hover {
    border: 1px dashed #285bc7;
  }

  .rail__thumb:before {
    content: '';
    width: 24px;
    height: 24px;
    display: block;
    background-color: #285bc7;
    border-radius: 50%;
  }

  .rail__thumb--left {
    transform: translate(50px, -50%);
  }

  .rail__thumb--right {
    transform: translate(200px, -50%);
  }
</style>