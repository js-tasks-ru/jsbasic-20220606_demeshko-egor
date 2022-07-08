import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #menu;
  #leftClassList = ['ribbon__arrow', 'ribbon__arrow_left', 'ribbon__arrow_visible'];
  #rightClassList = ['ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible'];

  constructor(categories) {
    this.categories = categories;

    this.#menu = document.createElement('div');
    this.#menu.classList.add('ribbon');

    let arrowsArray = this.#createArrowOfArrows();
    this.#menu.append(arrowsArray[0]);
    this.#menu.append(this.#createRibbonMenu());
    this.#menu.append(arrowsArray[1]);

    this.#initializeListeners();
  }


  get elem(){
    return this.#menu;
  }


  #createArrowOfArrows(){
     let leftArrow;
     let rightArrow;
     let array = [];
     const img = `<img src="../../assets/images/icons/angle-icon.svg" alt="icon">`;

    leftArrow = document.createElement('button');
    rightArrow = document.createElement('button');

    for(let name of this.#leftClassList){
      leftArrow.classList.add(name);
    }
    leftArrow.insertAdjacentHTML('afterbegin', img);

    for(let name of this.#rightClassList) {
      rightArrow.classList.add(name);
    }
    rightArrow.insertAdjacentHTML('afterbegin', img);

    array.push(leftArrow);
    array.push(rightArrow);
    return array;
  }


  #createRibbonMenu(){
    const all = 'All';
    let ribbonInner = document.createElement('div');
    ribbonInner.classList.add('ribbon__inner');

    for (let item of this.categories){
      let { name, id } = item;
      if (name != all){
        ribbonInner.insertAdjacentHTML('beforeend', `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`);
      } else if (name == all) {
        ribbonInner.insertAdjacentHTML('afterbegin', `<a href="#" class="ribbon__item ribbon__item_active" data-id="${id}">${name}</a>`);
      }
    }

    return ribbonInner;
   }


   #initializeListeners(){
     const left = this.#menu.querySelector('.ribbon__arrow_left');
     const right = this.#menu.querySelector('.ribbon__arrow_right');
     const ribbonInner = this.#menu.querySelector('.ribbon__inner');
     let scrollWidth;
     let scrollLeft;
     let clientWidth;


     left.addEventListener( 'click', (event) =>{
       ribbonInner.scrollBy(-350, 0);
     });

     right.addEventListener( 'click', (event) =>{
       ribbonInner.scrollBy(350, 0);
     });

     ribbonInner.addEventListener( 'scroll', (event)=>{
       let element = event.currentTarget;
       let scrollRight;

       if (element.scrollLeft == 0) left.classList.remove('ribbon__arrow_visible');
       if (element.scrollLeft > 0) left.classList.add('ribbon__arrow_visible');


       scrollWidth = ribbonInner.scrollWidth;
       scrollLeft = ribbonInner.scrollLeft;
       clientWidth = ribbonInner.clientWidth;
       scrollRight = scrollWidth - scrollLeft - clientWidth;
       if (scrollRight == 0) right.classList.remove('ribbon__arrow_visible');
       if (scrollRight > 0) right.classList.add('ribbon__arrow_visible');
     });

       this.#menu.addEventListener('click', this.#handleAnchorEvent);
   }


   #handleAnchorEvent(event){
     const active = 'ribbon__item_active';

     if( event.target.tagName == 'A' ){
       let lastActiveAnchor = document.querySelector(`.${active}`);
       lastActiveAnchor.classList.remove(active);

       event.target.classList.add(active);
     }

     let customEvent = new CustomEvent('ribbon-select', {detail: event.target.dataset.id,
                                                   bubbles: true});
     event.target.dispatchEvent(customEvent);
   }
}
