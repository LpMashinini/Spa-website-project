import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { FiUser } from "react-icons/fi";
import ProfileMenu from "../../Pages/ProfileMenu";
import "./Navbar.css";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUser = () => {

      try {

        const savedUser = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        setUser(
          localStorage.getItem("token") && savedUser
            ? savedUser
            : null
        );

      } catch {

        setUser(null);

      }

    };

    loadUser();

    window.addEventListener("authChanged", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
      window.removeEventListener("storage", loadUser);
    };

  }, []);

  const toggleMenu = () => {
    setOpenMenu((previous) => !previous);
  };

  const closeMenu = () => setOpenMenu(false);

  return (
    <div className="nav-container">
      <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
        <h1 className="logo">
          Blissful <span>&</span> Balance
        </h1>
      </Link>

      <button
        type="button"
        className="navbar-menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {openMenu ? <CloseIcon className="menu" /> : <MenuIcon className="menu" />}
      </button>

      <ul className={openMenu ? "open" : ""}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><a href="/#about" onClick={closeMenu}>About us</a></li>
        <li><a href="/#Service" onClick={closeMenu}>Service</a></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        <li><Link to="/appointment" onClick={closeMenu}>Appointment</Link></li>
      </ul>

      {/* Only the avatar is displayed in the navbar */}
      <div className="navbar-account">
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <Link
            to="/login"
            className="navbar-profile-circle"
            aria-label="Log in"
          >
            <FiUser />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;