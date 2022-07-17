export default class StepSlider {
  #slider;
  #steps;
  #previousSlider;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#slider = document.createElement('div');
    this.#slider.classList.add('slider');
    this.#createThumb();
    this.#createProgress();
    this.#createSteps(steps);
    this.#embraceListeners();
  }

  get elem(){
    return this.#slider;
  }


  #createThumb(){
    const string = `<span class="slider__value">0</span>`;
    let thumb = document.createElement('div');
    thumb.classList.add('slider__thumb');

    thumb.insertAdjacentHTML('afterbegin', string);
    thumb.ondragstart = () => false;
    this.#slider.append(thumb);
  }


  #createProgress(){
    const string = 'slider__progress';
    const progress = document.createElement('div');

    progress.classList.add(string);
    this.#slider.append(progress);
  }


  #createSteps(stepsCount){
    const steps = document.createElement('div');
    steps.classList.add('slider__steps');

    for (let i = 0; i < stepsCount; i++){
      let span = document.createElement('span');

      if(i == 0) span.classList.add('slider__step-active');
      steps.append(span);
    }

    this.#slider.append(steps);
  }


  #embraceListeners(){
    this.#slider.addEventListener('pointerdown', this.#calculateThumbPosition.bind(this));
    this.#slider.addEventListener('click', this.#thumbPositionAfterClick.bind(this));
  }


  #calculateThumbPosition(event){
    event.preventDefault();
    const thumbElement = this.#slider.querySelector('.slider__thumb');
    if(event.target != thumbElement) return false;
    this.#slider.classList.add('slider_dragging');

    const slider = this.#slider;
    let sliderCoors = slider.getBoundingClientRect();

    const sliderProgress = this.#slider.querySelector('.slider__progress');
    const spanContainer = this.#slider.querySelector('.slider__steps');
    const sliderValue = this.#slider.querySelector('.slider__value');
    let sliderClientWidth = slider.clientWidth;
    let activeSpan = this.#slider.querySelector('.slider__step-active');
    let spanOffsetWidth = activeSpan.offsetWidth;
    let segmentPX = (sliderClientWidth - spanOffsetWidth * this.#steps) / this.#steps;
    let allSpan = spanContainer.querySelectorAll('span');
    let min = segmentPX;
    let chosenSpan;
    let spanId;

    document.addEventListener('pointermove', onMove);

    document.addEventListener('pointerup', (event) => {
      this.#slider.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onMove);
      allSpan.forEach( (element, index, arr) => {
      let calc = Math.abs(element.offsetLeft - (event.clientX - slider.offsetLeft));
      if( calc < min) {
        min = calc;
        chosenSpan = element;
        spanId = index;
      }
    });

    let sliderToMove = chosenSpan.offsetLeft - thumbElement.clientWidth / 2 + 10 + spanOffsetWidth / 2;
    let sliderToMovePrecentage = Math.round(sliderToMove / slider.offsetWidth * 100);
    sliderProgress.style.width = sliderToMovePrecentage + '%';
    thumbElement.style.left = sliderToMovePrecentage + '%';
    activeSpan.classList.remove('slider__step-active');
    chosenSpan.classList.add('slider__step-active');
    sliderValue.textContent = spanId;

    if(chosenSpan != this.#previousSlider){
      this.#previousSlider = chosenSpan;
      let newEvent = new CustomEvent('slider-change', {
        detail: spanId,
        bubbles: true,
      });
      this.#slider.dispatchEvent(newEvent);
    }
  });

  function onMove(event){
    event.preventDefault();
    let clientX = event.clientX;
    if(clientX < sliderCoors.left){
      thumbElement.style.left = '0%';
    } else if(clientX > sliderCoors.right) {
      thumbElement.style.left = '100%';
    } else {
      let calculatedWidth = Math.round((clientX - sliderCoors.left) / slider.offsetWidth * 100) + '%';
      thumbElement.style.left = calculatedWidth;
      sliderProgress.style.width = calculatedWidth;
    }
  }

 }


  #thumbPositionAfterClick(){
      const sliderProgress = this.#slider.querySelector('.slider__progress');
      const thumbElement = this.#slider.querySelector('.slider__thumb');
      const slider = this.#slider;
      const spanContainer = this.#slider.querySelector('.slider__steps');
      const sliderValue = this.#slider.querySelector('.slider__value');
      let activeSpan = this.#slider.querySelector('.slider__step-active');
      let sliderClientWidth = slider.clientWidth;
      let spanOffsetWidth = activeSpan.offsetWidth;
      let segmentPX = (sliderClientWidth - spanOffsetWidth * this.#steps) / this.#steps;
      let allSpan = spanContainer.querySelectorAll('span');
      let min = segmentPX;
      let chosenSpan;
      let spanId;

      allSpan.forEach( (element, index, arr) => {
      let calc = Math.abs(element.offsetLeft - (event.clientX - slider.offsetLeft));
      if( calc < min) {
        min = calc;
        chosenSpan = element;
        spanId = index;
      }
    });

    let sliderToMove = chosenSpan.offsetLeft - thumbElement.clientWidth / 2 + 10 + spanOffsetWidth / 2;
    let sliderToMovePrecentage = Math.round(sliderToMove / slider.offsetWidth * 100);
    sliderProgress.style.width = sliderToMovePrecentage + '%';
    thumbElement.style.left = sliderToMovePrecentage + '%';
    activeSpan.classList.remove('slider__step-active');
    chosenSpan.classList.add('slider__step-active');
    sliderValue.textContent = spanId;

    if(chosenSpan != this.#previousSlider){
      this.#previousSlider = chosenSpan;
      let newEvent = new CustomEvent('slider-change', {
        detail: spanId,
        bubbles: true,
      });
      this.#slider.dispatchEvent(newEvent);
    }

  }
}
