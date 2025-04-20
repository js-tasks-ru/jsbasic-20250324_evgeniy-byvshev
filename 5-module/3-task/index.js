function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  
  let currentSlide = 0;
  const slidesCount = 4; // по условию слайдов ровно 4
  const slideWidth = carouselInner.offsetWidth;

  // Инициализация видимости кнопок
  updateArrowsVisibility();

  arrowRight.addEventListener('click', () => {
    currentSlide++;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateArrowsVisibility();
  });

  arrowLeft.addEventListener('click', () => {
    currentSlide--;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateArrowsVisibility();
  });

  function updateArrowsVisibility() {
    // Скрываем/показываем кнопки в зависимости от текущего слайда
    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = currentSlide === slidesCount - 1 ? 'none' : '';
  }
}
