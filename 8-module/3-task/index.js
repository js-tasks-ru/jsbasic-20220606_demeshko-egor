export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }


  addProduct(product) {
    if(!product) return;
    let productToAdd = null;

    if (this.cartItems.length != 0){
      for (let object of this.cartItems){
        if(object.product.id == product.id){
          object.count += 1;
        } else {
          productToAdd = product;
        }
      }
    } else {
      this.addNewProduct(product);
    }

    if (productToAdd){
      this.addNewProduct(productToAdd);
    }
  }


  addNewProduct(product){
    const cartItemsKeys = ['product', 'count'];

    let cartItem = {};
    cartItem[cartItemsKeys[0]] = product;
    cartItem[cartItemsKeys[1]] = 1;
    this.cartItems.push(cartItem);
    this.onProductUpdate(cartItem);
  }


  updateProductCount(productId, amount) {
    if(productId === null) return;
    this.cartItems.find( (cartItem, index, arr) => {
      if(!cartItem) return;

      if(cartItem.product.id === productId) {
        cartItem.count += amount;

        if (cartItem.count == 0){
          for(let i = index; i < arr.length-1; i++){
            arr[i] = arr[i+1];
          }

        arr.pop();
        }

        this.onProductUpdate(cartItem);
      };
    });
  }


  isEmpty() {
    if(this.cartItems.length == 0) return true;
    return false;
  }


  getTotalCount() {
    let count = 0;

    for(let cartItem of this.cartItems){
      if (!cartItem) return 0;
      count += cartItem.count;
    }

    return count;
  }


  getTotalPrice() {
    let totalPrice = 0;

    for(let cartItem of this.cartItems){
      if(!cartItem) return 0;
      totalPrice += cartItem.count * cartItem.product.price;
    }

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}
