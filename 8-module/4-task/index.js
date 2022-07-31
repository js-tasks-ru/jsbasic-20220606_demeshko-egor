import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(!product) return;
    let cartItem = null;

    let isProductIn = this.cartItems.find( (item) => {
      if (item.product.id === product.id){
        cartItem = item;
        return true;
      }
    });

    if(!isProductIn){
      this.addNewProduct(product);
    }

    if(isProductIn){
      this.onProductUpdate(cartItem);
      this.updateProductCount(cartItem.product.id, 1);
    }
  }

  addNewProduct(product){
    const cartItemsKeys = ['product', 'count'];

    let cartItem = {};
    cartItem[cartItemsKeys[0]] = product;
    cartItem[cartItemsKeys[1]] = 1;
    this.cartItems.push(cartItem);
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    if(productId === null) return;
    this.cartItems.find( (cartItem, index, arr) => {
      if(!cartItem) return;

      if(cartItem.product.id === productId) {
        cartItem.count += amount;

        if (cartItem.count == 0){
          for(let i = index; i < arr.length-1; i++){
            arr[i] = arr[i+1];
          }

        arr.pop();
        }

        this.onProductUpdate(cartItem);
      };
    });
  }

  isEmpty() {
    if(this.cartItems.length == 0) return true;
    return false;
  }

  getTotalCount() {
    let count = 0;

    for(let cartItem of this.cartItems){
      if (!cartItem) return 0;
      count += cartItem.count;
    }

    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for(let cartItem of this.cartItems){
      if(!cartItem) return 0;
      totalPrice += cartItem.count * cartItem.product.price;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    const modalBodyInner = document.createElement('div');
    this.modal.setTitle('Your order');

    for(let item of this.cartItems){
      let elementToRender = this.renderProduct(item.product, item.count);
      modalBodyInner.append(elementToRender);
    }

    const form = this.renderOrderForm();
    modalBodyInner.append(form);
    this.modal.setBody(modalBodyInner);

    this.modal.open();

    let initialize = initializeListeners.bind(this);
    initialize();


    function initializeListeners(){
        const cart = document.querySelectorAll(`.cart-product`);
        const form = document.querySelector(`.cart-form`);
        for (let item of cart){
          item.addEventListener('click', (event)=>{
          let button = event.target.closest('button');
          let cartItem;

          if (!button) return;

          if(button.className === 'cart-counter__button cart-counter__button_minus') {
            for (let item of this.cartItems){
              let productId = item.product.id;
              if(event.currentTarget.dataset.productId === productId){
                this.updateProductCount(productId, -1);
              }
            }
          };

          if(button.className === 'cart-counter__button cart-counter__button_plus') {
            debugger;
            for (let item of this.cartItems){
              let productId = item.product.id;
              if(event.currentTarget.dataset.productId === productId){
                this.updateProductCount(productId, 1);
              }
            }
          };
       });

       form.addEventListener('submit', (event) => {
         event.preventDefault();
         this.onSubmit();
       })
    }
    }


  }

  onProductUpdate(cartItem) {
    let id = cartItem.product.id;
    const modalBody = document.querySelector('.modal__body');



    if(modalBody){
      const elementToChange = modalBody.querySelector(`[data-product-id = ${id}]`);
      const infoPrice = modalBody.querySelector('.cart-buttons__info-price');
      const productPrice = modalBody.querySelector(`[data-product-id="${id}"] .cart-product__price`);
      const productCount = modalBody.querySelector(`[data-product-id="${id}"] .cart-counter__count`);

      if(elementToChange){
        productCount.textContent = cartItem.count;
        productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }

      if(cartItem.count === 0 && elementToChange){
        elementToChange.remove();
      }

      if(this.cartItems.length === 0) {
        this.modal.close();
      };
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    const submitButton = document.querySelector(`[type='submit']`);
    const form = document.querySelector('form');
    submitButton.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    }).then( (response) => {
      if(response.ok){
        debugger;
        this.modal.setTitle('Success!');
        this.cartItems = [];
        const modalBody = document.querySelector('.modal__body');
        modalBody.innerHTML = `<div class="modal__body-inner"><p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p></div>`;
      }
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
