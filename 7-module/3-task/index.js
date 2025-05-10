export default class StepSlider {
  constructor(config) {
    this.steps = config.steps;
    this.value = config.value;
    this.elem = this.#render();
  }

  #render() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    const thumbValue = document.createElement('span');
    thumbValue.className = 'slider__value';
    thumbValue.textContent = this.value;
    thumb.appendChild(thumbValue);

    const progress = document.createElement('div');
    progress.className = 'slider__progress';

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';
    
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }

    const segments = this.steps - 1;
    const valuePercents = this.value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    slider.appendChild(thumb);
    slider.appendChild(progress);
    slider.appendChild(stepsContainer);

    slider.addEventListener('click', (event) => {
      this.#handleClick(event, slider, thumb, progress, stepsContainer, thumbValue);
    });

    return slider;
  }

  #handleClick(event, slider, thumb, progress, stepsContainer, thumbValue) {
    const left = event.clientX - slider.getBoundingClientRect().left;
    const leftRelative = left / slider.offsetWidth;
    const segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    
    value = Math.max(0, Math.min(value, this.steps - 1));
    
    if (value !== this.value) {
      this.value = value;
      
      thumbValue.textContent = value;
      
      const steps = stepsContainer.querySelectorAll('span');
      steps.forEach((step, index) => {
        if (index === value) {
          step.classList.add('slider__step-active');
        } else {
          step.classList.remove('slider__step-active');
        }
      });
      
      const valuePercents = value / segments * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      
      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));
    }
  }
}