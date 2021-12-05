import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'
import FoodContext from '../../FoodContext'

class Counter extends Component {
  state = {
    counter: 1,
  }

  increaseCounter = () =>
    this.setState(prevState => ({counter: prevState.counter + 1}))

  decreaseCounter = () =>
    this.setState(prevState => ({
      counter: prevState.counter - 1,
    }))

  render() {
    let {counter} = this.state
    const {match} = this.props
    const inCartPath = match.path === '/cart' ? 0 : 1
    return (
      <FoodContext.Consumer>
        {value => {
          const {
            cartItems,
            increaseItemQuantity,
            decreaseItemQuantity,
            delFromCartFunc,
          } = value
          const {counterId, delCounterFunc} = this.props

          // updating counter value according to existing cart item
          const item = cartItems.filter(eachItem => counterId === eachItem.id)
          if (item.length > 0) {
            counter = item[0].quantity
          }

          const onIncrement = () => {
            increaseItemQuantity(counterId)
            this.increaseCounter()
          }

          const onDecrement = () => {
            if (counter > 1) {
              decreaseItemQuantity(counterId)
            } else {
              delFromCartFunc(counterId)
              if (inCartPath) {
                delCounterFunc()
              }
            }
            this.decreaseCounter()
          }
          if (inCartPath) {
            return (
              <div className="counter-div">
                <button
                  testid="decrement-quantity"
                  className="btn"
                  type="button"
                  onClick={onDecrement}
                >
                  -
                </button>
                <div>
                  <p className="counter-para" testid="item-quantity">
                    {counter}
                  </p>
                </div>
                <button
                  testid="increment-quantity"
                  className="btn"
                  type="button"
                  onClick={onIncrement}
                >
                  +
                </button>
              </div>
            )
          }
          return (
            <div className="counter-div">
              <button
                testid="decrement-count"
                className="btn"
                type="button"
                onClick={onDecrement}
              >
                -
              </button>
              <div>
                <p className="counter-para" testid="active-count">
                  {counter}
                </p>
              </div>
              <button
                testid="increment-count"
                className="btn"
                type="button"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}

export default withRouter(Counter)
