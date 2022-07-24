import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth > 0){
      const cartCordinates = this.elem.getBoundingClientRect();

      if (cartCordinates.top < 0){
         Object.assign(this.elem.style, {
           position: 'fixed',
           top: '50px',
           zIndex: 1e3
         });
       };

      if (this.elem.style.position == 'fixed'){
       const container = document.querySelector('.container');
       let containerCordinates = container.getBoundingClientRect();
       let leftIntent = Math.min(containerCordinates.right + 20,
                                 document.documentElement.clientWidth - this.elem.offsetWidth - 10);
       this.elem.style.left = leftIntent + 'px';
      }

      if(window.pageYOffset < 50){
         Object.assign(this.elem.style, {
           position: 'absolute',
           top: '',
           left: '',
           zIndex: ''
         });
      }

      if(document.documentElement.clientWidth <= 767){
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }
    }
  }


}
