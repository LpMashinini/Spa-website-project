import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        const { email, password } = formData;

        // Frontend validation
        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            console.log("Login successful:", data);

            // Store JWT
            localStorage.setItem("token", data.token);

            // Store basic user information
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("email", data.email);
            localStorage.setItem("verified", data.verified);

            // Redirect after successful login
            navigate("/");

        } catch (err) {
            console.error("Login error:", err);

            if (err.response) {
                if (err.response.status === 401) {
                    setError("Incorrect email or password.");
                } else if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } else if (err.response.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Login failed. Please try again.");
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
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-logo">
                        SPA
                    </div>

                    <h1>Welcome Back</h1>

                    <p>
                        Sign in to continue your relaxing experience.
                    </p>

                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

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

                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="login-footer">

                    <span>Don't have an account?</span>

                    <Link to="/signup">
                        Create an account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;
