import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileMenu.css";


function getSavedUser() {

  try {

    return JSON.parse(localStorage.getItem("user") || "{}");

  } catch {

    return {};

  }

}


function getInitials(name = "") {

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "U";
}

export default function ProfileMenu({ user, onLogout }) {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();


  const savedUser = getSavedUser();

  const currentUser = {
    ...savedUser,
    ...user,
  };

  const name =
    currentUser.name ||
    currentUser.fullName ||
    currentUser.firstName ||
    "My Account";

  const email =
    currentUser.email ||
    localStorage.getItem("email") ||
    "";

  const initials = getInitials(name); 

  useEffect(() => {

    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {

    setOpen(false);

    if (onLogout) {

      onLogout();

    } else {

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("verified");

      window.dispatchEvent(new Event("authChanged"));
      navigate("/login");

    }
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      {/* Only the initials circle appears in the navbar */}
      <button
        className="profile-menu__trigger"
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Open account menu for ${name}`}
      >
        {initials}
      </button>

      {/* Separate floating dropdown */}
      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown__header">
            <span className="profile-avatar profile-avatar--large">
              {initials}
            </span>

            <div className="profile-dropdown__user">
              <strong>{name}</strong>
              {email && <span>{email}</span>}
            </div>
          </div>

          <div className="profile-dropdown__divider" />

          <Link
            to="/my-appointments"
            className="profile-dropdown__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="profile-dropdown__icon">▦</span>
            My Appointments
          </Link>

          <div className="profile-dropdown__divider" />

          <button
            type="button"
            className="profile-dropdown__item profile-dropdown__logout"
            role="menuitem"
            onClick={handleLogout}
          >
            <span className="profile-dropdown__icon">↪</span>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
