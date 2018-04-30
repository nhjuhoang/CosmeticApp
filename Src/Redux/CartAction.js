export function addToCart(item) {
    return {
        type: 'ADD_CART',
        item: item
    };
  }
  
  export function removeFromCart(item) {
    return {
        type: 'REMOVE_CART',
        item: item
    };
  }