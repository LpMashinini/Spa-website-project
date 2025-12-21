import './footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import NorthIcon from '@mui/icons-material/North';
import { Link } from 'react-router-dom';

const footer = () => {
  return (


    <section className="footer-section">
      <div className="footer-content">
        <p className="headerText">our special offer</p>
        <h2 className="headerText">YOU OWE YOURSELF THIS MOMENT</h2>
        <p className="headerText">Visit one of our multiple sessions of relaxation.</p>

        <button>book now</button>

        
        <a href="#home"> <NorthIcon className='up-arrow' fontSize="large"/></a>

        <div className="footer">

          <div className="left-footer">
            <h4>2024 all rights reserved | @ Blissful & Balance Touch</h4>
          </div>

          <div className="right-footer">

            {/* social media icons  */}
            <InstagramIcon className="icons" />
            <FacebookIcon className="icons" />
            <TwitterIcon className="icons" />
          </div>

        </div>

      </div>
    </section>
  )
}

export default footer
