import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./PaymentCallback.css";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment."
  );

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      const reference =
        searchParams.get("reference") ||
        searchParams.get("trxref");

      const token = localStorage.getItem("token");

      if (!reference) {
        setStatus("error");
        setMessage("We couldn't find your payment reference.");
        return;
      }

      if (!token) {
        setStatus("login");
        setMessage(
          "Please log in again to check your payment status."
        );
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/payments/verify-payment/${encodeURIComponent(
            reference
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        const result = response.data;

        const paymentSucceeded =
          result?.data?.status === "SUCCESS" ||
          result?.status === "SUCCESS" ||
          result?.success === true;

        if (paymentSucceeded) {
          setStatus("success");
          setMessage(
            "Your payment has been verified and your appointment is booked."
          );
        } else {
          setStatus("pending");
          setMessage(
            result?.message ||
              "We haven't confirmed your payment yet. Please check your appointments before trying again."
          );
        }
      } catch (error) {
        console.error(
          "Payment verification failed:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setStatus("error");
          setMessage(
            "We couldn't verify your payment right now. Your payment may still have been processed, so please check your appointments before trying again."
          );
        }
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const statusContent = {
    loading: {
      eyebrow: "JUST A MOMENT",
      title: "Confirming your payment",
      description: "We're securely checking your transaction.",
      icon: "◌",
    },
    success: {
      eyebrow: "PAYMENT CONFIRMED",
      title: "Your moment of calm awaits.",
      description: "Your payment is confirmed. We look forward to welcoming you.",
      icon: "✓",
    },
    pending: {
      eyebrow: "AWAITING CONFIRMATION",
      title: "Almost there",
      description: "Your transaction hasn't been confirmed yet.",
      icon: "…",
    },
    error: {
      eyebrow: "VERIFICATION ISSUE",
      title: "Let's check your booking",
      description: "Your payment status needs a little attention.",
      icon: "!",
    },
    login: {
      eyebrow: "SIGN IN REQUIRED",
      title: "Welcome back",
      description: "Sign in to securely check your appointment.",
      icon: "↗",
    },
  };

  const content = statusContent[status];

  return (
    <main className={`payment-page payment-page--${status}`}>
      <div className="payment-orb payment-orb--one" />
      <div className="payment-orb payment-orb--two" />

      <header className="payment-brand">
        <span className="payment-brand__mark">B</span>
        <div>
          <span className="payment-brand__name">
            Blissful <span>&</span> Balance
          </span>
          <span className="payment-brand__tagline">
            YOUR SPACE TO UNWIND
          </span>
        </div>
      </header>

      <section
        className="payment-card"
        aria-live="polite"
        aria-busy={status === "loading"}
      >
        <div className={`payment-icon payment-icon--${status}`}>
          {status === "loading" ? (
            <span className="payment-spinner" />
          ) : (
            content.icon
          )}
        </div>

        <p className="payment-eyebrow">{content.eyebrow}</p>

        <h1>{content.title}</h1>

        <p className="payment-description">{content.description}</p>

        <div className={`payment-notice payment-notice--${status}`}>
          <span className="payment-notice__dot" />
          <p>{message}</p>
        </div>

        {status === "success" && (
          <div className="payment-next-step">
            <span className="payment-next-step__icon">✦</span>
            <div>
              <strong>Time for you</strong>
              <p>Your spa experience is one step closer.</p>
            </div>
          </div>
        )}

        <div className="payment-actions">
          {status === "login" ? (
            <Link to="/login" className="payment-button">
              Log in to continue <span>→</span>
            </Link>
          ) : (
            <Link to="/appointments" className="payment-button">
              View my appointments <span>→</span>
            </Link>
          )}

          {status !== "loading" && (
            <Link to="/" className="payment-secondary-link">
              Return to homepage
            </Link>
          )}
        </div>

        <div className="payment-security">
          <span>♧</span>
          <span>Your transaction details are handled securely.</span>
        </div>
      </section>

      <footer className="payment-footer">
        <span>PAUSE. BREATHE. RECONNECT.</span>
        <span>© {new Date().getFullYear()} Blissful & Balance</span>
      </footer>
    </main>
  );
}