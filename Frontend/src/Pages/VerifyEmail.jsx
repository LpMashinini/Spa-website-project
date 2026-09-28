import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";

function VerifyEmail() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        
        const storedEmail = sessionStorage.getItem("verificationEmail");
        const storedUserId = sessionStorage.getItem("verificationUserId");

        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 6) {
            setOtp(value);
            setError("");
            setSuccess("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError("Please enter the 6-digit verification code.");
            return;
        }

        if (!userId) {
            setError("User information is missing. Please register again.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response = await axios.post(
                "http://localhost:8080/api/auth/verify-email",
                {
                    userId: Number(userId),
                    code: otp
                }
            );

            setSuccess(
                response.data || "Email verified successfully."
            );

            sessionStorage.removeItem("verificationEmail");
            sessionStorage.removeItem("verificationUserId");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            console.error("Email verification error:", err);

            if (err.response) {
                if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } else if (err.response.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Invalid or expired verification code.");
                }
            } else {
                setError(
                    "Unable to connect to the server. Please try again later."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            setError("Email address is missing. Please register again.");
            return;
        }

        try {
            setResending(true);
            setError("");
            setSuccess("");

            const response = await axios.post(
                "http://localhost:8080/api/auth/resend-email-otp",
                {
                    email: email
                }
            );

            setSuccess(
                response.data || "A new verification code has been sent."
            );

        } catch (err) {
            console.error("Resend OTP error:", err);

            if (err.response) {
                if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } else if (err.response.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Unable to resend the verification code.");
                }
            } else {
                setError(
                    "Unable to connect to the server. Please try again later."
                );
            }
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="verify-page">

            <div className="verify-background"></div>

            <div className="verify-card">

                <div className="verify-icon">
                    ✉
                </div>

                <div className="verify-header">

                    <span className="verify-label">
                        EMAIL VERIFICATION
                    </span>

                    <h1>Check your email</h1>

                    <p>
                        We've sent a 6-digit verification code to
                    </p>

                    <strong>
                        {email || "your email address"}
                    </strong>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="verify-form"
                >

                    {error && (
                        <div className="verify-message error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="verify-message success">
                            {success}
                        </div>
                    )}

                    <div className="otp-group">

                        <label htmlFor="otp">
                            Verification Code
                        </label>

                        <input
                            id="otp"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength="6"
                            placeholder="000000"
                            value={otp}
                            onChange={handleOtpChange}
                            className="otp-input"
                            autoFocus
                        />

                        <span className="otp-hint">
                            Enter the 6-digit code sent to your email.
                        </span>

                    </div>

                    <button
                        type="submit"
                        className="verify-button"
                        disabled={loading || otp.length !== 6}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>

                </form>

                <div className="resend-section">

                    <span>
                        Didn't receive the code?
                    </span>

                    <button
                        type="button"
                        className="resend-button"
                        onClick={handleResendOtp}
                        disabled={resending}
                    >
                        {resending ? "Sending..." : "Resend code"}
                    </button>

                </div>

                <div className="verify-footer">

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Back to Sign In
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifyEmail;

