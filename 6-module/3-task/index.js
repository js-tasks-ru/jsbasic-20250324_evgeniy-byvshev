import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides;
  #currentSlideIndex = 0;
  #elem;
  #updateCarousel;

  constructor(slides) {
    this.#slides = slides;
    this.#elem = this.#createCarousel();
    this.#initCarousel();
    this.#addEventListeners();
  }

  get elem() {
    return this.#elem;
  }

  #createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = carousel.querySelector('.carousel__inner');
    
    this.#slides.forEach(slide => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="../../assets/images/carousel/${slide.image}" 
               class="carousel__img" 
               alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      carouselInner.appendChild(slideElement);
    });

    return carousel;
  }

  #initCarousel() {
    const arrowLeft = this.#elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.#elem.querySelector('.carousel__arrow_right');
    const carouselInner = this.#elem.querySelector('.carousel__inner');
    const slidesCount = this.#slides.length;

    arrowLeft.style.display = 'none';

    this.#updateCarousel = () => {
      const slideWidth = carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(-${this.#currentSlideIndex * slideWidth}px)`;

      arrowLeft.style.display = this.#currentSlideIndex === 0 ? 'none' : '';
      arrowRight.style.display = this.#currentSlideIndex === slidesCount - 1 ? 'none' : '';
    };

    arrowRight.addEventListener('click', () => {
      this.#currentSlideIndex++;
      this.#updateCarousel();
    });

    arrowLeft.addEventListener('click', () => {
      this.#currentSlideIndex--;
      this.#updateCarousel();
    });
  }

  #addEventListeners() {
    this.#elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (!button) return;

      const slide = button.closest('.carousel__slide');
      const productId = slide.dataset.id;

      const customEvent = new CustomEvent('product-add', {
        detail: productId,
        bubbles: true
      });

      this.#elem.dispatchEvent(customEvent);
    });
  }
}