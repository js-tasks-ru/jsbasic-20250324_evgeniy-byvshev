export default class StepSlider {
  constructor(config) {
    this.steps = config.steps;
    this.value = config.value;
    this.elem = this.#render();
    this.#addDragAndDrop();
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

  #addDragAndDrop() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const thumbValue = this.elem.querySelector('.slider__value');
    const stepsContainer = this.elem.querySelector('.slider__steps');

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();
        const left = moveEvent.clientX - this.elem.getBoundingClientRect().left;
        const leftRelative = Math.max(0, Math.min(left / this.elem.offsetWidth, 1));
        const leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        const segments = this.steps - 1;
        const approximateValue = leftRelative * segments;
        const value = Math.round(approximateValue);

        if (value !== this.value) {
          this.value = value;
          thumbValue.textContent = value;
          
          const steps = stepsContainer.querySelectorAll('span');
          steps.forEach((step, index) => {
            step.classList.toggle('slider__step-active', index === value);
          });
        }
      };

      const onPointerUp = (upEvent) => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        this.elem.classList.remove('slider_dragging');

        const left = upEvent.clientX - this.elem.getBoundingClientRect().left;
        const leftRelative = Math.max(0, Math.min(left / this.elem.offsetWidth, 1));
        const segments = this.steps - 1;
        const value = Math.round(leftRelative * segments);
        const valuePercents = value / segments * 100;

        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;

        this.value = value;
        thumbValue.textContent = value;
        
        const steps = stepsContainer.querySelectorAll('span');
        steps.forEach((step, index) => {
          step.classList.toggle('slider__step-active', index === value);
        });

        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp, { once: true });
    });
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
        step.classList.toggle('slider__step-active', index === value);
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