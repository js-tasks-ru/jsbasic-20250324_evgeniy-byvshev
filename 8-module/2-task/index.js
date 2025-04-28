import createElement from '../../assets/lib/create-element.js';
import ProductCard from './ProductCard.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.renderProducts();
  }

  renderProducts() {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';

    for (const product of this.filterProducts()) {
      const productCard = new ProductCard(product);
      gridInner.append(productCard.elem);
    }
  }

  filterProducts() {
    return this.products.filter(product => {
      if (this.filters.noNuts && (product.nuts === true || product.nuts === undefined && this.filters.noNuts)) {
        return false;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        return false;
      }
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }
      return true;
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderProducts();
  }
}