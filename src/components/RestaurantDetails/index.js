import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'

import AddFoodCard from '../AddFoodCard'
import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const apiReq = {
  isInitialized: 'INITIALIZE',
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiReq.isInitialized,
    foodsList: {},
  }

  componentDidMount() {
    this.getFoodItems()
  }

  getFoodsSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiReq.isFailure:
        return this.getFailureView()
      case apiReq.isLoading:
        return this.getLoadingView()
      case apiReq.isSuccess:
        return this.getFoodsSuccessView()
      default:
        return null
    }
  }

  getFailureView = () => (
    <div>
      <h1>Something Went Wrong</h1>
    </div>
  )

  getFoodsSuccessView = () => {
    const {foodsList} = this.state
    const {foodItems} = foodsList
    return (
      <ul className="foods-ul">
        {foodItems.map(foodItem => (
          <li testid="fooditem" className="food-li" key={foodItem.id}>
            <AddFoodCard data={foodItem} />
          </li>
        ))}
      </ul>
    )
  }

  getLoadingView = () => (
    <div className="loader-div" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  getFoodItems = async () => {
    this.setState({apiStatus: apiReq.isLoading})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {restaurantId} = params
    console.log(restaurantId)
    const url = `https://apis.ccbp.in/restaurants-list/${restaurantId}`

    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatededData = {
        id: data.id,
        name: data.name,
        cuisine: data.cuisine,
        costForTwo: data.cost_for_two,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(item => ({
          id: item.id,
          name: item.name,
          imageUrl: item.image_url,
          rating: item.rating,
          cost: item.cost,
          foodType: item.food_type,
        })),
      }
      //   console.log(updatededData)
      this.setState({
        foodsList: {...updatededData},
        apiStatus: apiReq.isSuccess,
      })
    } else {
      this.setState({apiStatus: apiReq.isFailure})
    }
  }

  render() {
    const {foodsList} = this.state
    const {
      imageUrl,
      name,
      costForTwo,
      rating,
      reviewsCount,
      cuisine,
    } = foodsList
    console.log(foodsList.location)
    return (
      <div className="food-container">
        <Navbar />
        <div className="banner-div">
          <img alt="restaurant" className="banner-img" src={imageUrl} />

          <div className="banner-content-div">
            <h1 className="banner-head">{name}</h1>
            <p className="para">{cuisine}</p>
            <p className="para">{foodsList.location}</p>
            <div className="banner-ratings-div">
              <div className="rating-views-div">
                <p className="para">
                  <AiFillStar color="#FFCC00" />
                  {rating}
                </p>
                <p className="para ratings-para">{reviewsCount}+ ratings</p>
              </div>
              <hr className="ratings-hr-line" />
              <div className="cost-of-two-div">
                <p className="para">
                  <BiRupee />
                  {costForTwo}
                </p>
                <p className="para ratings-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.getFoodsSection()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
