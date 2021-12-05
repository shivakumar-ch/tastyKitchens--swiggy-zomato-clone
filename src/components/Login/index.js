import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    errorMsg: '',
  }

  getUsername = event =>
    this.setState({inputUsername: event.target.value, errorMsg: ''})

  getPassword = event =>
    this.setState({inputPassword: event.target.value, errorMsg: ''})

  getAuthentication = async event => {
    event.preventDefault()
    this.setState({inputPassword: '', inputUsername: ''})
    const {inputPassword, inputUsername} = this.state
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: inputUsername,
      password: inputPassword,
    }

    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data, 'dataa')
    if (response.ok) {
      this.setState({errorMsg: ''})
      //   console.log(data.jwt_token)
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: `*${data.error_msg}`})
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {inputPassword, inputUsername, errorMsg} = this.state
    return (
      <div className="container">
        <div className="card">
          <div className="logo-div">
            <img
              src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1637816102/Group_7420_hen7ls.jpg"
              alt="website logo"
            />
            <h1 className="login-head">Tasty Kitchens</h1>
          </div>
          <h1 className="login-heading">Login</h1>
          <form className="form-div" onSubmit={this.getAuthentication}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              value={inputUsername}
              className="text-field"
              onChange={this.getUsername}
              id="username"
              placeholder="Enter Username"
              type="text"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="text-field"
              value={inputPassword}
              id="password"
              onChange={this.getPassword}
              placeholder="Enter Password"
              type="password"
            />
            <br />
            <p className="error-msg">{errorMsg}</p>
            <button className="login-btn">Login</button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1636712071/Rectangle_1456_yf7cap.jpg"
          className="login-lg-img"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
