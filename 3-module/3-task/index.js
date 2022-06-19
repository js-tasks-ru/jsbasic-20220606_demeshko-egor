function camelize(str) {
   let chars = str.split('');

   for (let i = 0; i < chars.length; i++){
     if (chars[i] === '-'){
       chars[i] = '';
       chars[i + 1] = chars[i + 1].toUpperCase();
     }
   }

  return chars.join('');
}
