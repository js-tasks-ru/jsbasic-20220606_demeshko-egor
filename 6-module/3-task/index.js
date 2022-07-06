import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #carousel;
  #innerDiv;
  #arrowLeft;
  #arrowRight;
  #currentSlide = 1;
  #totalSlides = 0;

  constructor(slides){
    this.slides = slides;
    this.#totalSlides = slides.length ;
    this.elem;
    this.#createCarousel();
    this.#createInnerDiv();
    this.#createArrows();
    this.#carousel.append(this.#innerDiv);
  }


  get elem(){
    return this.#carousel;
  }


  #createCarousel(){
    this.#carousel = document.createElement('div');
    this.#carousel.classList.add('carousel');
  }


  #createArrows(){
    const arrowsHTML = `<div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>`;

    this.#carousel.insertAdjacentHTML('afterbegin', arrowsHTML);
    this.#arrowLeft = this.#carousel.querySelector(".carousel__arrow_left");
    this.#arrowRight = this.#carousel.querySelector(".carousel__arrow_right");

    if (this.#currentSlide == 1) this.#arrowLeft.style.display = 'none';
    if (this.#currentSlide == this.#totalSlides) this.#arrowRight.style.display = 'none';

    this.#arrowLeft.addEventListener('click', this.#arrowControl.bind(this));
    this.#arrowRight.addEventListener('click', this.#arrowControl.bind(this));
  }


  #arrowControl(event){
    const eventTarget = event.currentTarget;

    let classListAsString = Array.from(eventTarget.classList).join(' ');
    const left = new RegExp('left');
    const right = new RegExp('right');

    if(classListAsString.match(left) !== null){
      this.#moveLeft();
    }

    if(classListAsString.match(right) !== null){
      this.#moveRight();
    }
}


  #moveLeft(){
    this.#currentSlide--;
    const slide = document.querySelector('.carousel__slide');

    if(this.#currentSlide <= 1) {
      this.#arrowLeft.style.display = 'none';
    } else if (this.#currentSlide == this.#totalSlides - 1){
      this.#arrowRight.style.display = 'flex';
    }

    this.#innerDiv.style.transform = `translateX(${-(this.#currentSlide-1) * slide.offsetWidth}px)`;
  }


  #moveRight(){
    this.#currentSlide++;
    const slide = document.querySelector('.carousel__slide');

    if( this.#currentSlide == this.#totalSlides ) {
      this.#arrowRight.style.display = 'none';
    } else if (this.#currentSlide == 2){
      this.#arrowLeft.style.display = 'flex';
    }

    this.#innerDiv.style.transform = `translateX(${-(this.#currentSlide-1) * this.#carousel.offsetWidth}px)`;
  }


  #createInnerDiv(){
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('carousel__inner');

    this.#innerDiv = innerDiv;
    this.#createSlides();
  }


  #createSlides(){
    let slides = this.slides;

    for (let good of slides){
      let {id, name, price, image} = good;
      let div = document.createElement('div');
      div.classList.add('carousel__slide');
      div.setAttribute('data-id', id);

      div.insertAdjacentHTML('afterbegin', `<img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">${price.toFixed(2)}</span>
                <div class="carousel__title">${name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>`);


      div.querySelector('.carousel__button').addEventListener('click', (event) => {
        let eventCustom = new CustomEvent('product-add', { detail: id, bubbles: true});
        console.log(`eventCustom: `, eventCustom);
        console.log(`createSlides, event.currentTarget: `, event.currentTarget);
        event.currentTarget.dispatchEvent(eventCustom);
      });

      this.#innerDiv.append(div);
      }
    }
  }
