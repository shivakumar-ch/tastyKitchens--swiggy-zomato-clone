import React from 'react'

const FoodContext = React.createContext({
  cartItems: [],
  addToCartFunc: () => {},
  delFromCartFunc: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  clearAll: () => {},
})

export default FoodContext
