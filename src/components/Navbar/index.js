import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Navbar extends Component {
  state = {
    showMenu: false,
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.push('/login')
  }

  changeShowMenuStatus = () =>
    this.setState(prevState => ({showMenu: !prevState.showMenu}))

  goToCart = () => {
    const {history} = this.props
    history.push('/cart')
  }

  goToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  getNavbarButtons = () => {
    const {match} = this.props
    const cartClsName = match.path === '/cart' ? 'active-btn' : 'passive-btn'
    const homeClsName = match.path !== '/cart' ? 'active-btn' : 'passive-btn'
    return (
      <>
        <li>
          <button onClick={this.goToHome} className={`home-btn ${homeClsName}`}>
            Home
          </button>
        </li>
        <li>
          <button onClick={this.goToCart} className={`cart-btn ${cartClsName}`}>
            Cart
          </button>
        </li>
        <li>
          <button onClick={this.onLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </>
    )
  }

  render() {
    const {showMenu} = this.state
    return (
      <>
        <nav className="nav-div">
          <button onClick={this.goToHome} className="logo-btn">
            <img
              src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1637816102/Group_7420_hen7ls.jpg"
              alt="website logo"
              className="logo-img"
            />
            Tasty Kitchens
          </button>
          <ul className="nav-ul">{this.getNavbarButtons()}</ul>
          <button className="hamberger-btn" onClick={this.changeShowMenuStatus}>
            <GiHamburgerMenu />
          </button>
        </nav>
        {showMenu && (
          <div className="popup-div">
            <ul className="popup-ul">{this.getNavbarButtons()}</ul>
            <button
              className="popup-close-btn"
              onClick={this.changeShowMenuStatus}
            >
              <AiFillCloseCircle color="#000000" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Navbar)
