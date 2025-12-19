import "./Navbar.css"

const Navbar = () => {

  return (
    <div className="nav-container">
      <h1 className="logo">Blissful <span>&</span> Balance</h1>
      <ul>
        <li> <a href="#">Home</a></li>
        <li> <a href="#">Service</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Contact</a></li>
        <li className="appointment"><a href="#">appointment</a></li>
      </ul>
    </div>
  )
}

export default Navbar
