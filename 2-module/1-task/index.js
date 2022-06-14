function sumSalary(salaries) {
  let salarySum = 0;

  for ( let key in salaries ){
    let ifSalary = salaries[key];

    if ( typeof ifSalary == 'number'
         && !isNaN(ifSalary)
         && isFinite(ifSalary) ) {
      salarySum += ifSalary;
    }
  }

  return salarySum;
}
