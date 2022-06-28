function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  let changeRate = -carousel.offsetWidth;
  let currentSlide = 0;

  leftArrow.style.display = "none";
  carousel.style.transform = `translateX(0px)`;

  leftArrow.addEventListener('click', goLeft);
  rightArrow.addEventListener('click', goRight);

  function goLeft(){
    currentSlide--;
    changeDisplay();
  }

  function goRight(){
    currentSlide++;
    changeDisplay();
  }

  function changeDisplay(){
     switch(currentSlide){
       case 0:
       leftArrow.style.display = "none";
       carousel.style.transform = `translateX(${currentSlide * changeRate}px)`;
       break;

       case 1:
       leftArrow.style.display = "flex";
       carousel.style.transform = `translateX(${currentSlide * changeRate}px)`;
       break;

       case 2:
       rightArrow.style.display = "flex";
       carousel.style.transform = `translateX(${currentSlide * changeRate}px)`;
       break;

       case 3:
       rightArrow.style.display = "none";
       carousel.style.transform = `translateX(${currentSlide * changeRate}px)`;
       break;
     }
  }

}
