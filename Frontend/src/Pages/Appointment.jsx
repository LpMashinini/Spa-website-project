import "./Appointment.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import LoginRequiredModal from "../Pages/LoginRequiredModal";
import axios from "axios";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const API_URL = "";

const Appointment = ({ currentYear = new Date().getFullYear() }) => {
  const [values, setValues] = useState({
    title: "",
    appointmentDate: "",
    numberOfGuests: "",
    treatmentId: "",
  });

  const [treatments, setTreatments] = useState([]);
  const [isLoadingTreatments, setIsLoadingTreatments] = useState(true);
  const [treatmentError, setTreatmentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formError, setFormError] = useState("");

  const submissionLock = useRef(false);

  const getLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  useEffect(() => {

    let isMounted = true;

    const fetchTreatments = async () => {
      
      setIsLoadingTreatments(true);
      setTreatmentError("");

      try {
        const response = await axios.get(`${API_URL}/api/v1/treatments`);

        if (isMounted) {
          setTreatments(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Failed to fetch treatments:", error);

        if (isMounted) {
          setTreatmentError(
            "We couldn't load treatments right now. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingTreatments(false);
        }
      }
    };

    fetchTreatments();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (submissionLock.current) return;

    if (
      !values.title ||
      !values.appointmentDate ||
      !values.numberOfGuests ||
      !values.treatmentId
    ) {
      setFormError("Please complete all fields before continuing.");
      return;
    }

    if (values.appointmentDate < getLocalDate()) {
      setFormError("Please select today or a future date.");
      return;
    }

    const guestCount = Number(values.numberOfGuests);

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      setFormError("Please enter a valid number of guests.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setFormError("");

    let appointmentCreated = false;

    try {
      // 1. Create the appointment.
      const bookingResponse = await axios.post(
        `${API_URL}/api/v1/appointments/book-appointment`,
        {
          title: values.title,
          appointmentDate: values.appointmentDate,
          numberOfGuests: guestCount,
          treatmentId: Number(values.treatmentId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      appointmentCreated = true;

      const appointmentId = bookingResponse.data?.id;

      if (!appointmentId) {
        throw new Error(
          "The appointment may have been created, but the booking ID was not returned. Please check your appointments before trying again."
        );
      }

      // 2. Initialise payment.
      const paymentResponse = await axios.post(
        `${API_URL}/api/v1/payments/appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3. Get and validate the Paystack checkout URL.
      const authorizationUrl =
        paymentResponse.data?.data?.authorization_url ??
        paymentResponse.data?.authorization_url;

      if (typeof authorizationUrl !== "string") {
        throw new Error("The payment checkout URL was not returned.");
      }

      let checkoutUrl;

      try {
        checkoutUrl = new URL(authorizationUrl);
      } catch {
        throw new Error("The payment checkout URL is invalid.");
      }

      if (
        checkoutUrl.protocol !== "https:" ||
        checkoutUrl.hostname !== "checkout.paystack.com"
      ) {
        throw new Error("The payment provider returned an unexpected URL.");
      }

      // 4. Continue to Paystack checkout.
      window.location.assign(checkoutUrl.href);
    } catch (error) {
      console.error("Booking/payment error:", error);

      if (error.response?.status === 401) {
        setShowLoginModal(true);
      } else {
        const serverMessage = error.response?.data?.message;
        const message =
          serverMessage ||
          error.message ||
          "Something went wrong. Please try again.";

        setFormError(
          appointmentCreated
            ? `Your appointment may already exist, but payment setup failed. ${message} Check your existing appointments before submitting again.`
            : `We couldn't complete your booking. ${message}`
        );
      }
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  };

  const selectedTreatment = treatments.find(
    (treatment) => String(treatment.id) === String(values.treatmentId)
  );

  return (
    <main className="appointment-page">
      <section className="appointment-hero">
        <div className="appointment-hero-inner">
          <header className="appointment-topbar">
            <Link to="/" className="appointment-brand">
              Blissful <span>&amp;</span> Balance
            </Link>

            <nav className="appointment-nav" aria-label="Main navigation">
              <Link to="/">Home</Link>
            </nav>

            <span className="appointment-topbar-note">
              YOUR TIME, YOUR SPACE
            </span>
          </header>

          <div className="appointment-hero-copy">

            <h1>
              Make room
              <br />
              for <em>yourself.</em>
            </h1>

            <p>
              A little time away from the everyday can make all the difference.
              Choose your treatment and let us take care of the rest.
            </p>

            <a href="#appointment-booking" className="appointment-hero-link">
              Reserve your moment
              <ArrowOutwardIcon fontSize="small" />
            </a>
          </div>

          <div className="appointment-hero-bottom">
            <span>THOUGHTFUL TREATMENTS. TIME WELL SPENT.</span>
          </div>
        </div>
      </section>

      <section
        className="appointment-booking-section"
        id="appointment-booking"
      >
        <div className="appointment-section-intro">

          <h2>
            Your next chapter
            <br />
            of <em>calm.</em>
          </h2>

          <p>
            Tell us a little about your visit. Once your booking is created,
            you’ll continue to secure it through our payment checkout.
          </p>
        </div>

        <div className="appointment-booking-layout">
          <div className="appointment-form-card">
            <div className="appointment-form-heading">
              <div>
                <span className="appointment-form-index">
                  STEP 01 / YOUR VISIT
                </span>
                <h3>Plan your appointment</h3>
              </div>

              <span className="appointment-form-heading-icon">
                <CalendarMonthOutlinedIcon />
              </span>
            </div>

            <form
              className="appointment-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="appointment-field">
                <label htmlFor="appointment-title">Title</label>
                <p>How would you like us to address you?</p>

                <select
                  id="appointment-title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>

              <div className="appointment-field">
                <label htmlFor="appointment-treatment">Treatment</label>
                <p>Choose the experience that suits you.</p>

                <select
                  id="appointment-treatment"
                  name="treatmentId"
                  value={values.treatmentId}
                  onChange={handleChange}
                  required
                  disabled={isLoadingTreatments || treatments.length === 0}
                >
                  <option value="">
                    {isLoadingTreatments
                      ? "Loading treatments..."
                      : treatmentError
                        ? "Treatments unavailable"
                        : treatments.length === 0
                          ? "No treatments available"
                          : "Select a treatment"}
                  </option>

                  {treatments.map((treatment) => (
                    <option key={treatment.id} value={treatment.id}>
                      {treatment.name}
                    </option>
                  ))}
                </select>

                {treatmentError && (
                  <p className="appointment-field-error" role="alert">
                    {treatmentError}
                  </p>
                )}
              </div>

              <div className="appointment-form-row">
                <div className="appointment-field">
                  <label htmlFor="appointment-date">Preferred date</label>
                  <p>Choose a date for your visit.</p>

                  <input
                    id="appointment-date"
                    type="date"
                    name="appointmentDate"
                    value={values.appointmentDate}
                    min={getLocalDate()}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="appointment-field">
                  <label htmlFor="appointment-guests">Number of guests</label>
                  <p>How many people are visiting?</p>

                  <input
                    id="appointment-guests"
                    type="number"
                    name="numberOfGuests"
                    value={values.numberOfGuests}
                    min="1"
                    step="1"
                    placeholder="e.g. 1"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {formError && (
                <div
                  className="appointment-form-error"
                  role="alert"
                  aria-live="polite"
                >
                  {formError}
                </div>
              )}

              <div className="appointment-form-actions">
                <p>
                  <LockOutlinedIcon fontSize="small" />
                  Payment is handled securely through Paystack.
                </p>

                <button
                  type="submit"
                  className="appointment-submit"
                  disabled={isSubmitting || isLoadingTreatments}
                >
                  <span>
                    {isSubmitting ? "Preparing checkout..." : "Continue to payment"}
                  </span>
                  {!isSubmitting && <ArrowOutwardIcon fontSize="small" />}
                </button>
              </div>

              <p className="appointment-form-footnote">
                You’ll be redirected to Paystack after your booking is created.
              </p>
            </form>
          </div>

          <aside className="appointment-summary">
            <div className="appointment-summary-top">
              <span className="appointment-section-label">
                YOUR BOOKING
              </span>
              <SpaOutlinedIcon className="appointment-summary-flower" />
            </div>

            <h3>
              A slower pace.
              <br />
              A little more <em>you.</em>
            </h3>

            <p className="appointment-summary-description">
              Your wellness experience begins with a simple reservation.
              Take a moment, choose what feels right, and leave the rest to us.
            </p>

            <div className="appointment-summary-divider" />

            <div className="appointment-summary-detail">
              <span>TREATMENT</span>
              <strong>{selectedTreatment?.name || "Not selected yet"}</strong>
            </div>

            <div className="appointment-summary-detail">
              <span>DATE</span>
              <strong>
                {values.appointmentDate
                  ? new Date(
                      `${values.appointmentDate}T12:00:00`
                    ).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Choose your preferred date"}
              </strong>
            </div>

            <div className="appointment-summary-detail">
              <span>GUESTS</span>
              <strong>
                {values.numberOfGuests
                  ? `${values.numberOfGuests} ${
                      Number(values.numberOfGuests) === 1 ? "guest" : "guests"
                    }`
                  : "Not specified"}
              </strong>
            </div>

            <div className="appointment-summary-note">
              <span className="appointment-summary-note-icon">
                <LockOutlinedIcon fontSize="small" />
              </span>
              <p>
                Your booking is created before payment begins. If checkout
                fails, check your appointments before submitting again.
              </p>
            </div>

            <Link to="/" className="appointment-back-link">
              Return to our home page
              <ArrowOutwardIcon fontSize="small" />
            </Link>
          </aside>
        </div>
      </section>

      <footer className="appointment-footer-a">
        <Link to="/" className="appointment-brand">
          Blissful <span>&amp;</span> Balance
        </Link>

        <p>
          © {currentYear} Blissful &amp; Balance. All rights reserved.
        </p>

        <div className="appointment-socials-a">
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
        </div>
      </footer>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </main>
  );
};

export default Appointment;