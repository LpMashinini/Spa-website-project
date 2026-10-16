
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const API_URL = "";

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

        const email = formData.email.trim();
        const password = formData.password;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                { email, password }
            );

            const data = response.data;

            console.log("Login response:", data);

            if (!data?.token) {
                console.error("Unexpected login response:", data);
                setError(
                    "Login response is missing the authentication token."
                );
                return;
            }

            const user = {
                id: data.userId ?? data.user?.id ?? null,
                name: data.name ?? data.user?.name ?? "",
                email: data.email ?? data.user?.email ?? email,
            };

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", String(user.id ?? ""));
            localStorage.setItem("email", user.email);
            localStorage.setItem(
                "verified",
                String(data.verified ?? false)
            );
            localStorage.setItem("user", JSON.stringify(user));

            // Notify components that authentication information changed.
            window.dispatchEvent(new Event("authChanged"));

            // Navigate after successful login.
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            console.error("Backend response:", err.response?.data);

            if (err.response?.status === 401) {
                setError("Incorrect email or password.");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (typeof err.response?.data === "string") {
                setError(err.response.data);
            } else if (err.response) {
                setError(`Login failed (HTTP ${err.response.status}).`);
            } else {
                setError(
                    "Unable to reach the backend. Check that the server is running and the URL is correct."
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
