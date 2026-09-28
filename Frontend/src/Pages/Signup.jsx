import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            phoneNumber,
            password,
            confirmPassword,
        } = formData;

        // Frontend validation
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    name,
                    email,
                    password,
                    phoneNumber,
                }
            );

            console.log(response.data);

            // Save the email so the verification page knows
            // which account is being verified.
            sessionStorage.setItem("verificationEmail", response.data.email);
            sessionStorage.setItem("verificationUserId", response.data.userId);

            // Go to email verification page
            navigate("/verify-email");

        } catch (err) {
            console.error("Registration error:", err);

            if (err.response) {
                if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } else if (err.response.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Registration failed. Please try again.");
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

    return (
        <div className="signup-page">

            <div className="signup-card">

                <div className="signup-header">
                    <div className="signup-logo">
                        SPA
                    </div>

                    <h1>Create your account</h1>

                    <p>
                        Join us and book your next relaxing experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">

                    {error && (
                        <div className="signup-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>

                        <input
                            id="phoneNumber"
                            type="tel"
                            name="phoneNumber"
                            placeholder="+27 72 123 4567"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            autoComplete="tel"
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="password">Password</label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Minimum 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Repeat password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="signup-button"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <div className="signup-footer">
                    <span>Already have an account?</span>

                    <Link to="/login">
                        Sign in
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Signup;
