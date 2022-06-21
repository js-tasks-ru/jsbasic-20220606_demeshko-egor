function makeFriendsList(friends) {
  let friendString = '';
  const domListOfFriends = document.createElement('ul');

  for (let friend of friends){
   friendString += `<li>${friend.firstName} ${friend.lastName}</li>\n`;
  }

  domListOfFriends.innerHTML = friendString;
  return domListOfFriends;
}
