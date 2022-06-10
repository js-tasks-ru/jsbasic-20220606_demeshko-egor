function checkSpam(str) {
  const xBet = "1xbet";
  const xxx = "xxx";

  str = str.toLowerCase();

  if ( str.includes(xBet) || str.includes(xxx) ) return true;

  return false;
}
