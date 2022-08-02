import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
   #grid;
   backFilter = [];

  constructor(products) {
    this.products = products;
    this.filters = {};

    this.createCoreElements();
    this.#createProducts(this.products);
  }


  get elem(){
    return this.#grid || {};
  }


  createCoreElements(){
    const grid = document.createElement('div');
    const gridInner = `<div class="products-grid__inner">
    </div>`;
    grid.classList.add('products-grid');
    grid.innerHTML = gridInner;

    this.#grid = grid;
  }


  #createProducts(products){
    for (let product of products){
      let card = new ProductCard(product);

      this.#grid.firstElementChild.append(card.elem);
    }
  }


  updateFilter(filters){
    debugger;
    this.backFilter = this.products;
    let filterMap = {
      'noNuts': 'nuts',
      'vegeterianOnly': 'vegeterian',
      'maxSpiciness': 'spiciness',
      'category': 'category'
    };


    let{noNuts = false, vegeterianOnly = false, maxSpiciness = 4, category = ''} =
                                           Object.assign(this.filters, filters);
    let productsToSend = [];

    for ( let key of Object.keys(this.filters) ){
       let value = this.filters[key];

       if(typeof value == 'number' && value < 4){
         this.backFilter = this.backFilter.filter( (product) => {
           let propertyValue = product[filterMap[key]];

           if (propertyValue <= value){
             return true;
           }
           return false;
         });

       } else if ( typeof value == "boolean" && filterMap[key] == 'nuts' ){
         this.backFilter = this.backFilter.filter( (product)=>{
           if(product[filterMap[key]]){
              return false;
           } else {
             return true;
           }
       });

       }  else if ( typeof value == "boolean" && value ){
         this.backFilter = this.backFilter.filter( (product)=>{
         return product[filterMap[key]] || false;
       });

      } else if ( ( typeof value == 'string' && value )  ){
         this.backFilter = this.backFilter.filter( (product)=>{
           if (product[filterMap[key]] == value){
             return product[filterMap[key]];
           };
         return false;
       });
     }
    }

    this.backFilter.forEach( (product) => productsToSend.push(product));


    this.#grid.firstElementChild.innerHTML = '';

    this.#createProducts(productsToSend);
  }

}
