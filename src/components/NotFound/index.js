import './index.css'

const NotFound = props => {
  const {history} = props

  const goToHome = () => history.replace('/')

  return (
    <div className="not-found-div">
      <img
        alt="not found"
        className="not-found-img"
        src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1638330878/Group_m5fcbf.jpg"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button onClick={goToHome} className="not-found-btn">
        Home Page
      </button>
    </div>
  )
}
export default NotFound
