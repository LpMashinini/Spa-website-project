import './Appointment.css'
import { Link, useNavigate } from "react-router-dom"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Appointment = ({ currentYear }) => {


  const [values, setValues] = useState({
    title: '',
    appointmentDate: '',
    numberOfGuests: '',
    treatmentId: ''
  });

  const [treatments, setTreatments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionLock = useRef(false);

  const navigation = useNavigate();

  const checkEmptyInput = () => {

    // This function check for any empty input before submitting

    for (let input in values) {
      if (!values[input]) {
        alert("Please fill in all fields before submitting.")
        return true;
      }
    }
    return false;

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (submissionLock.current || checkEmptyInput()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to book an appointment.");
      navigation("/login");
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);

    let appointmentCreated = false;

    try {
      // 1. Create the appointment
      const bookingResponse = await axios.post(
        "http://localhost:8080/api/v1/appointments/book-appointment",
        {
          title: values.title,
          appointmentDate: values.appointmentDate,
          numberOfGuests: Number(values.numberOfGuests),
          treatmentId: Number(values.treatmentId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      appointmentCreated = true;

      const appointmentId = bookingResponse.data?.id;

      if (!appointmentId) {
        console.error("Appointment response:", bookingResponse.data);
        throw new Error(
          "The appointment was created, but its ID was not returned. Check your backend response before trying again."
        );
      }

      // 2. Initialize payment using your existing controller
      const paymentResponse = await axios.post(
        `http://localhost:8080/api/v1/payments/appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Payment initialization response:", paymentResponse.data);

      // 3. Extract the Paystack authorization URL
      const authorizationUrl =
        paymentResponse.data?.data?.authorization_url ??
        paymentResponse.data?.authorization_url;

      if (typeof authorizationUrl !== "string") {
        console.error("Paystack response:", paymentResponse.data);
        throw new Error("The Paystack checkout URL was not returned.");
      }

      let checkoutUrl;

      try {
        checkoutUrl = new URL(authorizationUrl);
      } catch {
        throw new Error("Paystack returned an invalid checkout URL.");
      }

      if (
        checkoutUrl.protocol !== "https:" ||
        checkoutUrl.hostname !== "checkout.paystack.com"
      ) {
        console.error("Unexpected checkout URL:", authorizationUrl);
        throw new Error("The checkout URL is not a recognised Paystack checkout URL.");
      }

      // 4. Redirect to Paystack
      window.location.assign(checkoutUrl.href);

    } catch (err) {
      console.error("Booking/payment error:", err);

      if (err.response) {
        console.error("HTTP status:", err.response.status);
        console.error("Backend response:", err.response.data);
      }

      const message =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";

      if (appointmentCreated) {
        alert(
          `Your appointment may already have been created, but payment initialization failed. ${message} Check your existing appointment before submitting again.`
        );
      } else {
        alert(`Booking failed: ${message}`);
      }

    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }

  };

  useEffect(() => {

    const fetchTreatments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/treatments");
        setTreatments(res.data);
      } catch (err) {
        console.error("Failed to fetch treatments:", err);
      }
    };

    fetchTreatments();
  }, []);

  const getLocalDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (

    <section className='appointment-section'>

      <div className='app-container'>

        <div className="logo-container">

          <h1>Blissful <span>&</span> Balance </h1>

          <div className='navigation'>
            <Link className='home' to="/"><li>Home</li> </Link>
          </div>

        </div>

        <div className="header-text">
          <h2>Book Appointment</h2>
          <p>Get 20% Off For Your First Visit</p>
        </div>

      </div>

      <section className='appointment-input'>

        <div className="appointment-header-text">
          <h2>Book Appointment</h2>
        </div>


        <form className='appointment-container' onSubmit={handleSubmit}>

          <div className="inputbox" id="select">

            <h1>Title:</h1>
            <span>Please select your title</span>

            <select required value={values.title} onChange={e => setValues({ ...values, title: e.target.value })} className='title'>
              <option value="">--select one--</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
            </select>

          </div>

          <div className="inputbox" id="select">

            <h4>Treatment:</h4>

            <span className="input-text">Please select treatment</span>

            <select required value={values.treatmentId} onChange={(e) => setValues({ ...values, treatmentId: e.target.value })} className="title">

              {/* Treatment selection */}

              <option value="">--select treatment--</option>

              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </option>
              ))}

            </select>

          </div>

          <div className="inputbox">
            <h4>Appointment Date:</h4>
            <span>Please enter appointment date</span>
            <input
              type="date"
              value={values.appointmentDate}
              required
              min={getLocalDate()} // Prevent selecting past dates
              onChange={e => setValues({ ...values, appointmentDate: e.target.value })}
            />
          </div>

          <div className="inputbox">
            <h4>Guest:</h4>
            <span>Please enter number of guest</span>
            <input
              type="number"
              min="1"
              value={values.numberOfGuests}
              required
              onChange={e => setValues({ ...values, numberOfGuests: e.target.value })} />
          </div>

          <div className="inputbox-btn">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Preparing payment" : "Book and Pay"}
            </button>
          </div>

        </form>



        <div className="footer">

          <div className="left-footer">
            <h4>{currentYear} all rights reserved | @ Blissful & Balance Touch</h4>
          </div>

          <div className="right-footer">

            {/* social media icons  */}
            <InstagramIcon className="icons" />
            <FacebookIcon className="icons" />
            <TwitterIcon className="icons" />
          </div>

        </div>


      </section>

    </section>

  )
}

export default Appointment
