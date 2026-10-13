import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your payment...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      const reference = searchParams.get("reference");
      const token = localStorage.getItem("token");

      if (!reference) {
        setMessage("No payment reference was returned.");
        return;
      }

      if (!token) {
        setMessage(
          "Please log in again to check your payment status."
        );
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/payments/verify-payment/${encodeURIComponent(reference)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        // Adapt this check if your verification DTO uses a different shape.
        const result = response.data;
        const paymentSucceeded =
          result?.data?.status === "SUCCESS" ||
          result?.status === "SUCCESS" ||
          result?.success === true;

        if (paymentSucceeded) {
          setSuccess(true);
          setMessage("Payment verified! Your appointment is booked.");
        } else {
          setMessage(
            result?.message ||
            "Payment verification returned an unexpected response. Please check your appointment status."
          );
        }
      } catch (error) {
        console.error(
          "Payment verification failed:",
          error.response?.data || error
        );

        if (!cancelled) {
          setMessage(
            "We could not verify your payment. Please check your appointment before trying to pay again."
          );
        }
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <main className="payment-callback">
      <h1>{success ? "Payment successful" : "Payment status"}</h1>
      <p>{message}</p>
      <Link to="/appointments">View my appointments</Link>
    </main>
  );
}