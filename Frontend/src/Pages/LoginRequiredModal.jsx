
import { Link } from "react-router-dom";
import "./LoginRequiredModal.css";

function LoginRequiredModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        <div className="auth-modal-icon" aria-hidden="true">
          ♡
        </div>

        <h2 id="auth-modal-title">Your wellness journey starts here</h2>

        <p>
          Please create an account before booking your appointment.
          Join us and take the first step towards relaxation and self-care.
        </p>

        <Link to="/signup" className="auth-modal-primary" onClick={onClose}>
          Create an account
        </Link>

        <p className="auth-modal-login">
          Already have an account?{" "}
          <Link to="/login" onClick={onClose}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginRequiredModal;
