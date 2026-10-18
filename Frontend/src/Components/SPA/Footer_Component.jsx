
import "./footer.css";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import NorthIcon from "@mui/icons-material/North";
import { Link } from "react-router-dom";

const Footer = ({ currentYear = new Date().getFullYear() }) => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      Icon: InstagramIcon,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      Icon: FacebookIcon,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/",
      Icon: TwitterIcon,
    },
  ];

  return (
    <footer className="footer-section" id="footer">
      {/* Booking call to action */}
      <div className="footer-cta">
        <p className="footer-eyebrow">YOUR TIME. YOUR WELLBEING.</p>

        <h2>
          You deserve a moment
          <br />
          <span>of complete relaxation.</span>
        </h2>

        <p className="footer-cta-description">
          Step away from the everyday and reconnect with yourself.
        </p>

        <Link to="#" className="footer-book-button">
          Book an appointment
        </Link>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="#" className="footer-logo">
            Blissful <span>&amp;</span> Balance
          </Link>

          <p>
            A peaceful space to relax, restore, and renew.
            Your wellbeing deserves thoughtful care.
          </p>

          <div className="footer-socials">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${name} page`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#about">About us</a></li>
            <li><a href="/#Service">Our services</a></li>
            <li><Link to="/appointment">Appointments</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Customer care</h3>
          <ul>
            <li><Link to="#">Booking policy</Link></li>
            <li><Link to="#">Cancellation policy</Link></li>
            <li><Link to="#">Refund policy</Link></li>
            <li><Link to="#">Frequently asked questions</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/terms-and-conditions">
                Terms &amp; conditions
              </Link>
            </li>
            <li><Link to="#">Privacy policy</Link></li>
            <li>
              <Link to="#">
                Cookie policy
              </Link>
            </li>
            <li>
              <Link to="#">
                Accessibility statement
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Blissful &amp; Balance. All rights reserved.
        </p>

        <a href="#home" className="footer-back-to-top">
          Back to top <NorthIcon fontSize="small" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
