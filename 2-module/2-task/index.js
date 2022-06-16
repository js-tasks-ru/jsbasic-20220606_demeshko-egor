function isEmpty(obj) {
  let objKeys = Object.keys( obj );

  return ( !objKeys[0] ) ? true : false;
}
