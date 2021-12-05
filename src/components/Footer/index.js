import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer-div">
      <div className="footer-tasty-kitchens-div">
        <img
          alt="website-footer-logo"
          className="footer-img-logo"
          src="https://res.cloudinary.com/dzpzhwjgy/image/upload/v1637848185/Frame_275_tkhq3w.png"
        />
        <h1>Tasty Kitchens</h1>
      </div>

      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="footer-ul">
        <li testid="pintrest-social-icon">
          <FaPinterestSquare className="footer-img-logo" />
        </li>
        <li testid="instagram-social-icon">
          <FaInstagram className="footer-img-logo" />
        </li>
        <li testid="twitter-social-icon">
          <FaTwitter className="footer-img-logo" />
        </li>
        <li testid="facebook-social-icon">
          <FaFacebookSquare className="footer-img-logo" />
        </li>
      </ul>
    </footer>
  )
}
