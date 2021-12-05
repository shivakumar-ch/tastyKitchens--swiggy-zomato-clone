import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {data} = props
  const {imageUrl, name, cuisine, totalReviews} = data
  return (
    <>
      <img alt="restaurant" className="thumbnail-img" src={imageUrl} />
      <div className="card-content">
        <h1 className="name">{name}</h1>
        <p className="cuisine">{cuisine}</p>
        <div className="rating-div">
          <AiFillStar color="#FFCC00" />
          <p className="rating-para">
            4.0
            <span className="rating-span">{`(${totalReviews} ratings)`}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default RestaurantCard
