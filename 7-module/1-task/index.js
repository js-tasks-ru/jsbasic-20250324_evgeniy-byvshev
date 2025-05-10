import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.currentActiveId = categories[0].id; 

    this.elem = this.#render();
  }

  #render() {
    const ribbon = document.createElement('div');
    ribbon.className = 'ribbon';

    const ribbonInner = document.createElement('div');
    ribbonInner.className = 'ribbon__inner';

    this.categories.forEach(category => {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'ribbon__item';
      item.dataset.id = category.id;
      item.textContent = category.name;

      if (category.id === this.currentActiveId) {
        item.classList.add('ribbon__item_active');
      }

      item.addEventListener('click', (event) => this.#onCategoryClick(event, category));
      ribbonInner.appendChild(item);
    });

    const arrowLeft = this.#createArrow('left');
    const arrowRight = this.#createArrow('right');

    arrowLeft.classList.remove('ribbon__arrow_visible');

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollRight = ribbonInner.scrollWidth - scrollLeft - ribbonInner.clientWidth;

      arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
      arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
    });

    ribbon.appendChild(arrowLeft);
    ribbon.appendChild(ribbonInner);
    ribbon.appendChild(arrowRight);

    return ribbon;
  }

  #createArrow(direction) {
    const arrow = document.createElement('button');
    arrow.className = `ribbon__arrow ribbon__arrow_${direction} ribbon__arrow_visible`;
    arrow.innerHTML = `<img src="../../assets/images/icons/angle-icon.svg" alt="icon">`;
    return arrow;
  }

  #onCategoryClick(event, category) {
    event.preventDefault();

    if (this.currentActiveId === category.id) {return;}

    const prevActive = this.elem.querySelector('.ribbon__item_active');
    if (prevActive) {
      prevActive.classList.remove('ribbon__item_active');
    }

    event.target.classList.add('ribbon__item_active');
    this.currentActiveId = category.id;

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: category.id,
      bubbles: true
    }));
  }
}