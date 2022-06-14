let calculator = {
  read(x, y){
    if ( typeof x == 'number' && typeof y == 'number' ){
    this.x = x;
    this.y = y;
    }
    return 'аргументы - не цифровые значения';
  },


  sum(){
    if ( !isEmpty(this) ){
      return this.x + this.y;
    }
    return 'не заданы "x" "y", запустите метод read(x, y)'
  },


  mul(){
    if ( !isEmpty(this) ){
      return this.x * this.y;
    }
    return 'не заданы "x" "y", запустите метод read(x, y)'
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально


function isEmpty(obj) {
  let objKeys = Object.keys( obj );

  return ( !objKeys[0] ) ? true : false;
}
