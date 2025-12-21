import './Appointment.css'
import { Link } from "react-router-dom"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Appointment = () => {

  return (

    <>
      <div className='app-container'>

        <div className="logo-container">

          <h1>Blissful <span>&</span> Balance </h1>

          <div className='navigation'>
            <Link className='home' to="/"><li>Home</li> </Link>
          </div>

        </div>

        <div className="header-text">
          <h2>Book Appointment</h2>
          <p>Get 20% Off For Your First Visit</p>
        </div>

      </div>

      <section className='appointment-input'>

        <div className="appointment-header-text">
          <h2>Book Appointment</h2>
        </div>


        <form className='appointment-container'>

          <div className="inputbox" id="select">
            <h1>Title</h1>
            <span>Please select your title</span>

            <select className='title'>
              <option value="Title">--select one--</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
            </select>

          </div>

          <div className="inputbox" id="select">
            <h4>Treatment:</h4>

            <span className="input-text">Please select treatment</span>

            <select className="title">

              {/* Treatment selection */}

              <option value="Title">--select--</option>

              <option value="Hydration Strategy - Brilliance">
                Hydration Strategy - Brilliance
              </option>

              <option value="Reverse - Ageing Ritual - Lift">
                Reverse - Ageing Ritual - Lift(1h30)
              </option>

              <option value="Instant Glow Green Tea Facial">
                Instant Glow Green Tea Facial(30 min)
              </option>

              <option value="Ensuring better life">Ensuring better life</option>

            </select>
          </div>

          <div className="inputbox">
            <h4>Arrival Date:</h4>
            <span>Please enter arrival date</span>
            <input type="date" placeholder="arrival date" />
          </div>

          <div className="inputbox">
            <h4>Name:</h4>
            <span>Please enter your names</span>
            <input type="text" placeholder="enter name" />
          </div>

          <div className="inputbox">
            <h4>Email:</h4>
            <span>Please enter your email address</span>
            <input type="email" placeholder="email address" />
          </div>

          <div className="inputbox">
            <h4>Phone:</h4>
            <span>Please enter your cell number </span>
            <input type="number" placeholder="enter cell number" />
          </div>

          <div class="inputbox">
            <h4>Guest:</h4>
            <span>Please enter number of guest</span>
            <input type="number"/>
          </div>

        </form>

        <div className="inputbox-btn">
          <button>booking now</button>
        </div>

        
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


      </section>

    </>

  )
}

export default Appointment
