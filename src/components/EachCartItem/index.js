import {BiRupee} from 'react-icons/bi'

import './index.css'
import FoodContext from '../../FoodContext'
import Counter from '../Counter'

const EachCartItem = props => {
  const {data} = props
  const {imageUrl, id, name, cost, quantity} = data
  const totalCostOfItem = cost * quantity
  return (
    <>
      <div className="cart-item-li-div">
        <img className="cart-item-thumbnail" src={imageUrl} />
        <div className="cart-item-content-div">
          <h1 className="cart-item-head">{name}</h1>
          <div className="counter-div">
            <Counter counterId={id} />
          </div>

          <p className="cart-item-para">
            <BiRupee color="#ffa412" />
            {totalCostOfItem}
          </p>
        </div>
      </div>
    </>
  )
}

export default EachCartItem
