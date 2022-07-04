export default class ProductCard {
  _card = document.createElement('div');

  constructor(product) {
    this.elem;
    this._card.classList.add('card');
    this.makeCard(product);
  }

  get elem(){
    return this._card;
  }

  makeCard( {name = 'no data', price = 0, image = 'no data', id} ){
    price = price.toFixed(2);

    const cardString = `<div class="card__top">
         <img src="../../assets/images/products/${image}" class="card__image" alt="product">
         <span class="card__price">€${price}</span></div>
    <div class="card__body">
         <div class="card__title">${name}</div>
         <button type="button" class="card__button">
           <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
         </button>
    </div>`;

    this._card.innerHTML = cardString;
    this.createAddToChartListener(id);
  }

  createAddToChartListener(id){
    let plusButton = this._card.querySelector('.card__button');
    console.log("plusButton: ", plusButton);
    plusButton.addEventListener('click', (event)=>{
      let newEvent = new CustomEvent('product-add',{
        detail: id,
        bubbles: true
      });
      event.target.dispatchEvent(newEvent);
    });
  }

}
