import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <div className="nav-container">

      <h1 className="logo">Blissful <span>&</span> Balance</h1>

      <ul>
        <li><a href="">Home</a></li>
        <li><a href="#about">About us</a></li>
        <li> <a href="#Service">Service</a></li>
        <Link to="/contact" className="contact"><li>Contact</li> </Link>
        <Link to="/appointment" className="appointment"><li>appointment</li></Link>
      </ul>

    </div>
  )
}

export default Navbar
