import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modalInnerFirstPart = `<div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>`;
  #modalInnerSecondPart = `<h3 class="modal__title"></h3></div>`;
  #modalInnerThirdPart = `<div class="modal__body"></div></div>`;

  #modal;

  #keyDown;

  constructor() {
    this.#modal = document.createElement('div');
    this.#modal.classList.add('modal');

    const overlay = document.createElement('div');
    overlay.className = 'modal__overlay';
    this.#modal.append(overlay);
  }


  open(){
    const modal = document.querySelector('.modal');
    document.body.classList.add('is-modal-open');

    if (modal) return;

    let modalString = this.#modalInnerFirstPart + this.#modalInnerSecondPart + this.#modalInnerThirdPart;
    this.#modal.insertAdjacentHTML('beforeend', modalString);
    document.body.append(this.#modal);
    this.#initializeListener();
  }


  setTitle(title = 'Модальное окно'){
    const modalTitle = document.querySelector('.modal__title');
    console.log(modalTitle);

    if(modalTitle) {
      modalTitle.textContent = title;
    } else {
      this.#modalInnerSecondPart = `<h3 class="modal__title">${title}</h3></div>`;
    }
  }


  setBody(element){
    const modalBody = document.querySelector('.modal__body');

    if(modalBody) {
      modalBody.innerHTML = element.outerHTML;
    } else {
      this.#modalInnerThirdPart = `<div class="modal__body">${element.outerHTML}</div></div>`;
    }
  }


  close(){
    const modal = document.querySelector('.modal');
    if(modal) modal.remove();
    document.body.classList.remove('is-modal-open');
    document.body.removeEventListener('keyDown', this.#keyDown);
  }


  #initializeListener(){
    const close = document.querySelector('.modal__close');

    if(close){
      close.addEventListener('click', ()=>{
        this.close();
      });
    }

    this.#keyDown = document.body.addEventListener('keydown', (event)=>{
      if (event.key == 'Escape') this.close();
    });
  }

}
