import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'modal';
    this.elem.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;
  }

  addEventListeners() {
    const closeBtn = this.elem.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => this.close());
    
    this.elem.querySelector('.modal__overlay').addEventListener('click', () => this.close());
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    
    this._keydownEventListener = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this._keydownEventListener);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(node);
  }

  close() {
    document.removeEventListener('keydown', this._keydownEventListener);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}