
import "./Contact.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MapComponent from "./MapComponent";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

const Contact = ({ currentYear = new Date().getFullYear() }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect this handler to your backend contact endpoint
    // before using the form in production.
    setStatus("Your form is ready to connect to the contact service.");
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-top">
          <Link to="/" className="contact-brand">
            Blissful <span>&amp;</span> Balance
          </Link>

          <nav className="contact-nav" aria-label="Contact page navigation">
            <Link to="/">Home</Link>
            <Link to="/appointment">Appointments</Link>
          </nav>
        </div>

        <div className="contact-hero-copy">
          <p className="contact-kicker">
            WE’RE HERE FOR YOU
          </p>

          <h1>
            Let’s start a
            <br />
            <em>conversation.</em>
          </h1>

          <p>
            Questions about a treatment, your booking, or simply need a little
            guidance? We’d love to hear from you.
          </p>
        </div>

        <div className="contact-hero-bottom">
          <span>PERSONAL CARE, THOUGHTFULLY DELIVERED</span>
          <span>CONTACT / 01</span>
        </div>
      </section>

      {/* Contact form and information */}
      <section className="contact-main">
        <div className="contact-intro">
          <span className="contact-section-label">GET IN TOUCH</span>
          <h2>
            Good things begin
            <br />
            with a <em>hello.</em>
          </h2>
          <p>
            Tell us what you need. Whether you’re planning your first visit or
            have a question about an upcoming appointment, we’re happy to help.
          </p>
        </div>

        <div className="contact-layout">
          {/* Message form */}
          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span>01 / YOUR MESSAGE</span>
              <h3>How can we help?</h3>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  Your name
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                What is this about?
                <input
                  type="text"
                  name="subject"
                  placeholder="Booking, treatments, general enquiry..."
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Your message
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="contact-submit-row">
                <p>We’ll use your details to respond to your enquiry.</p>

                <button type="submit" className="contact-submit">
                  Send enquiry
                  <ArrowOutwardIcon fontSize="small" />
                </button>
              </div>

              {status && (
                <p className="contact-form-status" role="status">
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Contact details */}
          <aside className="contact-info-panel">
            <span className="contact-section-label">THE DETAILS</span>
            <h3>A little more<br />about reaching us.</h3>

            <div className="contact-info-item">
              <span className="contact-info-icon">
                <LocationOnOutlinedIcon />
              </span>
              <div>
                <h4>Visit us</h4>
                <p>
                  Pretoria CBD, MAIN STREET, 12345
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">
                <MailOutlineIcon />
              </span>
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:YOUR_EMAIL@example.com">
                     Blissful&Balance@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">
                <PhoneOutlinedIcon />
              </span>
              <div>
                <h4>Call us</h4>
                <p>012 345 6789</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">
                <AccessTimeIcon />
              </span>
              <div>
                <h4>Opening hours</h4>
                <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 4:00 PM</p>
                <p>Sunday: 10:00 AM – 2:00 PM</p>
              </div>
            </div>

            <Link to="/appointment" className="contact-booking-link">
              Planning a visit?
              <span>
                Book an appointment <NorthEastIcon fontSize="small" />
              </span>
            </Link>
          </aside>
        </div>
      </section>

      {/* Location */}
      <section className="contact-location">
        <div className="contact-location-heading">
          <div>
            <span className="contact-section-label">FIND YOUR WAY TO US</span>
            <h2>Your moment of calm <em>awaits.</em></h2>
          </div>
          <p>
            We look forward to welcoming you.
            <br />
            Find our location below.
          </p>
        </div>

        <div className="contact-map-frame">
          <MapComponent />
        </div>
      </section>

      {/* Page footer */}
      <footer className="contact-footer">
        <Link to="/" className="contact-brand">
          Blissful <span>&amp;</span> Balance
        </Link>

        <p>
          © {currentYear} Blissful &amp; Balance. All rights reserved.
        </p>

        <div className="contact-socials">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Contact;
