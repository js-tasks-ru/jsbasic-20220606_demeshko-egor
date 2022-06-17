function showSalary(users, age) {
  let answerStr = '';
  let usersApproved = [];

  for (let user of users) {
    if (user.age <= age) usersApproved.push(user);
  }

  for (let i = 0; i < usersApproved.length; i++){
    let user = usersApproved[i];

    answerStr += `${user.name}, ${user.balance}`;
    answerStr += ( i == usersApproved.length - 1 ) ? '' : '\n';
  }

  return answerStr;
}
