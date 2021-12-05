import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'

import './index.css'
import FoodContext from '../../FoodContext'
import Counter from '../Counter'

class AddFoodCard extends Component {
  state = {
    showCounter: false,
  }

  changeAddBtnVisibility = () =>
    this.setState(prevState => ({showCounter: !prevState.showCounter}))

  render() {
    const {showCounter} = this.state
    const {data} = this.props
    const {imageUrl, id, name, cost, rating} = data
    return (
      <FoodContext.Consumer>
        {value => {
          const {cartItems, addToCartFunc, increaseItemQuantity} = value

          const addItemsToCart = () => {
            this.changeAddBtnVisibility()
            const ind = cartItems.findIndex(item => item.id === id)
            if (ind === -1) {
              const quantity = 1
              const item = {
                quantity,
                id,
                name,
                cost,
                imageUrl,
              }
              addToCartFunc(item)
            } else {
              increaseItemQuantity(id)
            }
          }

          const delAddBtn = () => this.changeAddBtnVisibility()

          return (
            <>
              <div className="li-item-div">
                <img
                  alt="restaurant"
                  className="item-thumbnail"
                  src={imageUrl}
                />
                <div className=" item-content">
                  <h1 className="item-head">{name}</h1>
                  <p className="item-para">{cost}</p>
                  <p className="item-para">
                    <AiFillStar color="#FFCC00" />
                    {rating}
                  </p>
                  {!showCounter ? (
                    <button onClick={addItemsToCart} className="add-btn">
                      add
                    </button>
                  ) : (
                    <Counter counterId={id} delCounterFunc={delAddBtn} />
                  )}
                </div>
              </div>
            </>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}

export default AddFoodCard
