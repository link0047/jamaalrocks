<script>
	export let min = 0;
	export let max = 75;
	export let width = 300;

	let svg;
	let diffValue = max - min;
  let railHeight = 4;
  let railWidth = width;
  let rangeHeight = 4;
  let rangeWidth = width;
	let rangeX = 0;
	let thumbRadius = 12;
	let railLimit = railWidth - thumbRadius;
	let lthumbX = 12;
	let rthumbX = railLimit;
	let svgX = 0;
	let currentThumb = null;
	let minValue = min;
	let maxValue = max;
	
	function handleMouseMove({ clientX }) {
		let x = Math.round(Math.min(clientX - svgX, railLimit));
		if (currentThumb == 'min') {
		  minValue = Math.round(Math.max(0,(x * diffValue) / railLimit)) + min;	
			x = Math.min(Math.max(12, x), rthumbX);
			const diff = x - lthumbX;
			lthumbX = x;
			rangeX = x;
			rangeWidth = rangeWidth - diff;
		} else if (currentThumb == 'max') {
			x = Math.max(lthumbX, x);
			maxValue = Math.round((x * diffValue) / railLimit) + min;
			rthumbX = x;
			rangeWidth = x - rangeX;
		}
	}
	
	function handleMouseUp() {
		document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
	}

  function handleMouseDown({ target }) {
    svgX = svg.getBoundingClientRect().x;
    if (target.classList.contains('thumb')) {
			currentThumb = target.classList.contains('minimum') ? 'min' : 'max';
			document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
		}
  }

  function sliderAction(node) {
    node.addEventListener('mousedown', handleMouseDown);
    return {
      destroy() {
        node.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mousemove', handleMouseMove);
	      document.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }
</script>
<div class="slider">
	<div class="slider__label">
		${minValue} - ${maxValue}
	</div>
	<svg bind:this={svg} role="none" use:sliderAction viewBox="0 0 {width} 24" width={width} height="24">
		<g aria-hidden="true" class="rail">
			<circle cx="8" cy="12" r="8"/>
			<rect y="10" rx="2" ry="2" height={railHeight} width={railWidth} />
			<circle cx={railWidth - 8} cy="12" r="8"/>
		</g>
		<g aria-hidden="true" class="range">
			<rect x={rangeX} y="10" height={rangeHeight} width={rangeWidth} />
		</g>
		<g role="slider" tabindex="0" aria-valuemin={min} aria-valuenow={minValue} aria-valuemax={maxValue} aria-label="Minimum Price in US dollars">
			<circle class="minimum thumb" cx={lthumbX} cy="12" r={thumbRadius} />
		</g>
		<g role="slider" tabindex="0" aria-valuemin={minValue} aria-valuenow={maxValue} aria-valuemax={max} aria-label="Maximum Price in US dollars">
			<circle class="maximum thumb" cx={rthumbX} cy="12" r={thumbRadius} />
		</g>
	</svg>
  <div class="slider__endcaps">
    <div class="start">${min}</div>
    <div class="end">${max}</div>
  </div>
</div>
<style>
	.slider {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		color: #212121;
    font-weight: 500;
		font-size: 14px;
    line-height: 1;
	}

  svg {
    margin: 8px 0;
  }
	
	.slider__label {
		text-align: center;
	}

  .slider__endcaps {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
  }
	
	.rail {
		fill: #909196;
	}
	
	[role="slider"] {
		-webkit-tap-highlight-color: transparent;
		outline: 0;
	}
	
	.minimum,
	.maximum {
		cursor: pointer;
	}
	
	.range,
	.thumb {
		fill: #285bc7;
	}

  .thumb:focus,
  .thumb:hover {
    
  }
</style>