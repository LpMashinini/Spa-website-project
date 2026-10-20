import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu as MenuIcon,
  FiX as CloseIcon,
  FiUser,
} from "react-icons/fi";
import ProfileMenu from "../../Pages/ProfileMenu";
import "./Navbar.css";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {

    const syncUser = () => {

      try {

        const token = localStorage.getItem("token");
        const savedUser = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        setUser(token && savedUser ? savedUser : null);
      } catch {
        setUser(null);
      }
      
    };

    window.addEventListener("authChanged", syncUser);
    window.addEventListener("storage", syncUser);

    syncUser();

    return () => {
      window.removeEventListener("authChanged", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const closeMenu = () => setOpenMenu(false);

  const toggleMenu = () => {
    setOpenMenu((previous) => !previous);
  };

  return (
    <header className="nav-container">
      {/* Logo */}
      <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
        <h1 className="logo">
          Blissful <span>&</span> Balance
        </h1>
      </Link>

      {/* Desktop navigation / mobile menu */}
      <nav
        className={`navbar-navigation ${openMenu ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <a href="/#about" onClick={closeMenu}>About us</a>
          </li>
          <li>
            <a href="/#Service" onClick={closeMenu}>Service</a>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </li>
          <li>
            <Link to="/appointment" onClick={closeMenu}>
              Appointment
            </Link>
          </li>
        </ul>
      </nav>

      {/* Account and responsive menu controls */}
      <div className="navbar-actions">
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

        <button
          type="button"
          className="navbar-menu-toggle"
          onClick={toggleMenu}
          aria-label={openMenu ? "Close navigation" : "Open navigation"}
          aria-expanded={openMenu}
        >
          {openMenu ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;