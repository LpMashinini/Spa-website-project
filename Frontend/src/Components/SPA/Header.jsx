import Navbar from "./Navbar";
import "./Header.css";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();

  const handleExploreTreatments = () => {
    navigate("/appointment");
  }


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

        <button onClick={handleExploreTreatments} className="header-cta">
          Explore Treatments
        </button>
        
      </div>

    </header>

  );
};

export default Header;
