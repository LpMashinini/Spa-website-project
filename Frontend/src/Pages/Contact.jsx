import './Contact.css'
import { Link } from "react-router-dom"
import MapComponent from './MapComponent'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contact = ({currentYear}) => {
  return (

    <>

      <div className="contact-container">

        <div className="logo-container">
          <h1>Blissful <span>&</span> Balance </h1>

          <div className='navigation'>
            <Link className='home' to="/"><li>Home</li> </Link>
            <Link className='home' to="/appointment"><li>appointment</li> </Link>
          </div>
        </div>


        <div className="header-text">
          <h2>Contact Us</h2>
          <p>Why don't you fill the form below and let us get in touch</p>
        </div>

      </div>


      <section className="contact-section">

        <div className="map-container">

          <div className="location-header">
            <span></span>
            <h2>our Location</h2>
            <span></span>
          </div>

          <MapComponent />

        </div>

        <div className="contact-input-container">

          <div className="contact-header-text">

            <span></span>
            <h2>Contact Us Have Any Questions?</h2>
            <span></span>
          </div>

          <div className="contact-details">

            <div className="input-section">

              <div className="input-headerText">
                <h2>Send A Message</h2>
                <p>If you want to ask anything just fill in the form below and send us.</p>
              </div>

              <form action="submit" className="input-container">

                <div className="first-col">

                  <div className="inputbox">
                    <input type="text" placeholder="your name" />
                  </div>

                  <div className="inputbox">
                    <input type="email" placeholder="email address" />
                  </div>

                </div>

                <div className="second-col">

                  <div className="inputbox">
                    <input type="text" placeholder="what's this about ?" />
                  </div>

                  <div className="inputbox-textarea">
                    <textarea placeholder="Message" style={{ height: "150px", width: "500px" }}></textarea>
                  </div>

                </div>

                <button>Submit</button>

              </form>

            </div>

            <div className="details-section">

              <div className="input-headerText">

                <h2>Contact Details</h2>
                <p>If you want to ask anything just fill in the form below and send us.</p>

              </div>

              <div className="details-container">

                <div className="details">
                  <h3>Our Location</h3>
                  <p>121 Madiba Street, Melbourne,<br />Victoria 3000 Pretoria</p>
                </div>

                <div className="details">
                  <h3>Contact Info</h3>
                  <p> <span>Phone:</span> +12 3 3456 7890</p>
                  <p> <span>Email:</span> Blissful&Balance@gmail.com</p>
                  <p> <span>Skype:</span> support. Blissful&Balance</p>
                </div>

                <div className="details">
                  <h3>Working Hours</h3>
                  <p> <span>Mon – Fri :</span> 9:00 AM - 7:00 PM</p>
                  <p> <span>Saturday:</span>   9:00 AM - 6:00 PM</p>
                  <p> <span>Sunday:</span> Closed</p>
                </div>

              </div>

            </div>


          </div>

        </div>

        <div className="footer">

          <div className="left-footer">
            <h4>{currentYear} all rights reserved | @ Blissful & Balance Touch</h4>
          </div>

          <div className="right-footer">

            {/* social media icons  */}
            <InstagramIcon className="icons" />
            <FacebookIcon className="icons" />
            <TwitterIcon className="icons" />
          </div>

        </div>



      </section>

    </>

  )
}

export default Contact
