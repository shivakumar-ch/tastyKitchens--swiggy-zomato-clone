import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Home from './components/Home'

import FoodContext from './FoodContext'
import Login from './components/Login'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import './App.css'

if (JSON.parse(localStorage.getItem('cartData')) === null) {
  localStorage.setItem('cartData', JSON.stringify([]))
}

class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cartData')),
  }

  clearCart = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({cartItems: []})
  }

  addToCartFunc = item => {
    const {cartItems} = this.state
    localStorage.setItem('cartData', JSON.stringify([...cartItems, item]))
    this.setState(prevState => ({cartItems: [...prevState.cartItems, item]}))
  }

  delFromCartFunc = id => {
    const {cartItems} = this.state
    const updatedList = cartItems.filter(item => item.id !== id)
    localStorage.setItem('cartData', JSON.stringify([...updatedList]))
    this.setState({cartItems: [...updatedList]})
  }

  increaseItemQuantity = id => {
    const {cartItems} = this.state

    const updatedList = cartItems.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    localStorage.setItem('cartData', JSON.stringify([...updatedList]))
    this.setState({cartItems: [...updatedList]})
  }

  decreaseItemQuantity = id => {
    const {cartItems} = this.state
    const updatedList = cartItems.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    localStorage.setItem('cartData', JSON.stringify([...updatedList]))
    this.setState({cartItems: [...updatedList]})
  }

  render() {
    const {cartItems} = this.state
    console.log(cartItems)
    return (
      <FoodContext.Provider
        value={{
          cartItems: [...cartItems],
          addToCartFunc: this.addToCartFunc,
          delFromCartFunc: this.delFromCartFunc,
          increaseItemQuantity: this.increaseItemQuantity,
          decreaseItemQuantity: this.decreaseItemQuantity,
          clearAll: this.clearCart,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:restaurantId"
            component={RestaurantDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </FoodContext.Provider>
    )
  }
}

export default App
