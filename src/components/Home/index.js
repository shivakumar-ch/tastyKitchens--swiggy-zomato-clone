import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {MdSort} from 'react-icons/md'
import {RiArrowDownSFill} from 'react-icons/ri'
import {GrFormCheckmark} from 'react-icons/gr'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import Popup from 'reactjs-popup'

import Navbar from '../Navbar'
import Footer from '../Footer'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiReq = {
  isInitialized: 'INITIALIZE',
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class Home extends Component {
  state = {
    restaurantsApiStatus: apiReq.isInitialized,
    offersApiStatus: apiReq.isInitialized,
    sortBy: 'Lowest',
    carouselList: [],
    restaurantsList: [],
    pageNo: 1,
    limit: 9,
    offset: 0,
  }

  componentDidMount() {
    this.getCarouselList()
    this.getRestaurantsList()
  }

  getSortBy = event =>
    this.setState(
      {sortBy: event.target.textContent, offset: 0, pageNo: 1},
      this.getRestaurantsList,
    )

  getCarouselList = async () => {
    this.setState({offersApiStatus: apiReq.isLoading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        carouselList: [...data.offers],
        offersApiStatus: apiReq.isSuccess,
      })
    } else {
      this.setState({offersApiStatus: apiReq.isFailure})
    }
  }

  getRestaurantsList = async () => {
    this.setState({restaurantsApiStatus: apiReq.isLoading})
    const {limit, offset, sortBy} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedList = data.restaurants.map(each => ({
        id: each.id,
        name: each.name,
        cuisine: each.cuisine,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
        imageUrl: each.image_url,
      }))
      console.log(updatedList)
      this.setState({
        restaurantsList: [...updatedList],
        restaurantsApiStatus: apiReq.isSuccess,
      })
    } else {
      this.setState({restaurantsApiStatus: apiReq.isFailure})
    }
  }

  nxtPageBtn = () => {
    const {pageNo} = this.state
    console.log(pageNo)
    if (pageNo <= 3) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
          offset: prevState.offset + 9,
        }),
        this.getRestaurantsList,
      )
    }
  }

  previousPageBtn = () => {
    const {pageNo} = this.state
    console.log(pageNo)
    if (pageNo > 1) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo - 1,
          offset: prevState.offset - 9,
        }),
        this.getRestaurantsList,
      )
    }
  }

  getRestaurantsSection = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiReq.isFailure:
        return this.getRestaurantsFailureView()
      case apiReq.isLoading:
        return this.getRestaurantsLoadingView()
      case apiReq.isSuccess:
        return this.getRestaurantsSuccessView()
      default:
        return null
    }
  }

  getOffersSection = () => {
    const {offersApiStatus} = this.state
    switch (offersApiStatus) {
      case apiReq.isFailure:
        return this.getOffersFailureView()
      case apiReq.isLoading:
        return this.getOffersLoadingView()
      case apiReq.isSuccess:
        return this.getOffersSuccessView()
      default:
        return null
    }
  }

  getOffersFailureView = () => (
    <div className="failure-div">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1637816102/Group_7420_hen7ls.jpg"
      />
      <h1 className="failure-head">Oops!!! Something Went Wrong</h1>
      <p className="failure-para">Check Your Connection and Try again</p>
      <button onClick={this.getCarouselList} className="failure-btn">
        Retry
      </button>
    </div>
  )

  getOffersSuccessView = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    }
    return (
      <ul className="carousel-ul">
        <Slider {...settings}>
          {carouselList.map(offer => (
            <li key={offer.id}>
              <img
                alt="offer"
                className="carousel-li-img"
                src={offer.image_url}
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  getOffersLoadingView = () => (
    <div className="loader-div" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height={30} width={30} />
    </div>
  )

  getRestaurantsFailureView = () => (
    <div className="failure-div">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1637816102/Group_7420_hen7ls.jpg"
      />
      <h1 className="failure-head">Oops!!! Something Went Wrong</h1>
      <p className="failure-para">Check Your Connection and Try again</p>
      <button onClick={this.getRestaurantsList} className="failure-btn">
        Retry
      </button>
    </div>
  )

  getRestaurantsSuccessView = () => {
    const {restaurantsList, pageNo} = this.state
    return (
      <>
        <ul className="restaurant-ul">
          {restaurantsList.map(restaurant => (
            <Link
              testid="restaurant-item"
              className="li-link"
              key={restaurant.id}
              to={`restaurant/${restaurant.id}`}
            >
              <li className="card-li">
                <RestaurantCard data={restaurant} />
              </li>
            </Link>
          ))}
        </ul>
        <div className="paginate-buttons-div">
          <button
            testid="pagination-left-button"
            className="page-btn"
            onClick={this.previousPageBtn}
          >
            <AiOutlineLeft color="#334155" />
          </button>
          <p>
            <span className="page-no-span" testid="active-page-number">
              {pageNo}
            </span>
            of 4
          </p>
          <button
            testid="pagination-right-button"
            className="page-btn"
            onClick={this.nxtPageBtn}
          >
            <AiOutlineRight color="#334155" />
          </button>
        </div>
      </>
    )
  }

  getRestaurantsLoadingView = () => (
    <div className="loader-div" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {sortBy} = this.state

    return (
      <div className="home-container">
        <Navbar />
        <div className="home-body">
          {this.getOffersSection()}
          <div className="restaurants-div">
            <h1 className="body-heading">Popular Restaurants</h1>
            <div className="sorting-div">
              <p className="body-para">
                Select your favourite restaurants special dish and make your day
                happy.
              </p>
              <div className="sort-popup-div">
                <Popup
                  trigger={
                    <button className="sort-trigger-btn">
                      <MdSort />
                      <p className="sort-para">{`Sort by ${sortBy}`}</p>
                      <RiArrowDownSFill />
                    </button>
                  }
                  className="sort"
                  position="bottom right"
                >
                  <div className="sort-buttons-div">
                    {sortByOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={this.getSortBy}
                        className="sort-options-btn"
                      >
                        <p className="options-btn-para">{opt.displayText}</p>
                        {sortBy === opt.displayText && <GrFormCheckmark />}
                      </button>
                    ))}
                  </div>
                </Popup>
              </div>
            </div>
            <hr className="hr-line" />
          </div>
          {this.getRestaurantsSection()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
