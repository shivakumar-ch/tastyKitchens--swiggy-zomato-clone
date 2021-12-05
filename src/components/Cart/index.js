import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'
import FoodContext from '../../FoodContext'
import EachCartItem from '../EachCartItem'

class Cart extends Component {
  state = {
    showOrderPlacedCard: false,
  }

  render() {
    const {showOrderPlacedCard} = this.state
    return (
      <FoodContext.Consumer>
        {value => {
          const {cartItems, clearAll} = value
          const {history} = this.props

          let totalCartValue = 0

          const placeOrder = () => {
            clearAll()
            this.setState(prevState => ({
              showOrderPlacedCard: !prevState.showOrderPlacedCard,
            }))
          }

          const goToHome = () => history.replace('/')

          const eachItemCost = cartItems.map(item => item.quantity * item.cost)

          if (eachItemCost.length > 0) {
            totalCartValue = eachItemCost.reduce(
              (item1, item2) => item1 + item2,
            )
          }
          console.log(totalCartValue, 'shiva')

          const bodyClsName =
            cartItems.length > 2 ? 'cart-body' : 'cart-body-vh'

          return (
            <div className="cart-container">
              <Navbar />
              {showOrderPlacedCard ? (
                <div className="order-placed-div">
                  <img
                    className="order-placed-img"
                    src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1638330878/Vector_1_kah5p1.jpg"
                  />
                  <h1 className="order-placed-head">Payment Successfull</h1>
                  <p className="order-placed-para">
                    Thank you for ordering Your payment is successfully
                    completed.
                  </p>
                  <button onClick={goToHome} className="order-placed-btn">
                    Go To Home Page
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.length === 0 ? (
                    <div className="empty-cart-div">
                      <img
                        alt="empty cart"
                        className="empty-cart-img"
                        src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1638330878/cooking_1_gmelcp.jpg"
                      />
                      <h1 className="empty-cart-head">No Order Yet!</h1>
                      <p className="empty-cart-para">
                        Your cart is empty. Add something from the menu.
                      </p>
                      <button onClick={goToHome} className="empty-cart-btn">
                        Order Now
                      </button>
                    </div>
                  ) : (
                    <div className="cart-body">
                      <ul className="cart-ul">
                        <li className="cart-headings">
                          <p className="items-para">Item</p>
                          <p className="quantity-para">Quantity</p>
                          <p className="price-para">Price</p>
                        </li>
                        {cartItems.map(foodItem => (
                          <li
                            testid="cartitem"
                            className="cart-li"
                            key={foodItem.id}
                          >
                            <EachCartItem data={foodItem} />
                          </li>
                        ))}
                      </ul>
                      <hr className="cart-hr-line" />
                      <div className="checkout-div">
                        <h1 className="total-head">Order Total :</h1>
                        <div className="total-amount-div">
                          <p className="total-cart-amount-para">
                            <BiRupee />
                            <span testid="total-price">{totalCartValue}</span>
                          </p>
                          <button
                            onClick={placeOrder}
                            className="place-order-btn"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <Footer />
                </>
              )}
            </div>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}

export default Cart

// import './index.css'

//   return (
//     <div className="not-found-div">
//       <img
//         className="not-founr-img"
//         src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1638330878/Group_m5fcbf.jpg"
//       />
//       <h1 className="not-found-head">Page Not Found</h1>
//       <p className="not-found-para">
//         We are sorry, the page you requested could not be found. Please go back
//         to the homepage
//       </p>
//       <button onClick={goToHome} className="not-found-btn">
//         Home Page
//       </button>
//     </div>
//   )
// }
// export default NotFound
