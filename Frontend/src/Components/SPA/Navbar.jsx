import "./Navbar.css"
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (

    <div className="nav-container">

      <h1 className="logo">Blissful <span>&</span> Balance</h1>

      <MenuIcon className="menu" onClick={toggleMenu} />

      <ul className={openMenu ? "open" : ""}>
        <CloseIcon className="menu" onClick={toggleMenu}/>
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
