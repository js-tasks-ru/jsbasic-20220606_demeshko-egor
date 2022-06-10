function factorial(n) {
  let answer = 1;

  while ( n >= 1 ){
    answer *= n;
    --n;
  }
  
  return answer;
}
