
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header className="container" id="home">
      <Navbar />

      <div className="header-content">
        <p className="header-eyebrow">BLISSFUL &amp; BALANCE</p>

        <h1>
          Relax. Restore.
          <br />
          <span>Renew.</span>
        </h1>

        <p className="header-description">
          A peaceful escape for your mind, body, and soul.
        </p>

        <a href="#services" className="header-cta">
          Explore Treatments
        </a>
      </div>
    </header>
  );
};

export default Header;
