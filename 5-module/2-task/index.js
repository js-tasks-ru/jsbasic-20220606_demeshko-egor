function toggleText() {
  const text = document.getElementById('text');
  const button = document.querySelector('button');


  button.addEventListener('click', ()=>{
    if (text.hidden){
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
