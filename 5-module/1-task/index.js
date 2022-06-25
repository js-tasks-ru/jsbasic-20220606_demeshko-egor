function hideSelf() {
   document.documentElement.addEventListener('click', hideButton);
}

function hideButton(event){
  const target = event.target;
  if (target.tagName === 'BUTTON'){
    target.hidden = true;
  }
}
