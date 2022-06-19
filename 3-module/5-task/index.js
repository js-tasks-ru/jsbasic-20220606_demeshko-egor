function getMinMax(str) {
    let answer = {
      min: 0,
      max: 0,
    }
    let numbers = [];

    for (let item of str.split(' ')){
      item = Number(item);
      if ( Number.isFinite(item) ) numbers.push(item);
    }

    answer.min = Math.min( ...numbers );
    answer.max = Math.max( ...numbers );

    return answer;
}
