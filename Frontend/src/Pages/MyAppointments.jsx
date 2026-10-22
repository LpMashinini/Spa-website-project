
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyAppointment.css";

const API_URL = "";

/* Social media icons — no additional icon package required */

const InstagramIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
);

const FacebookIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.1H7v3.2h2.8V21h3.7Z" />
    </svg>
);

const TwitterIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.8L6.9 21H4.1l6.5-7.5L3.7 3h5.8l4 6.3L18.9 3Zm-1 16h1.5L8.1 4.9H6.5L17.9 19Z" />
    </svg>
);

const MyAppointments = ({ currentYear = new Date().getFullYear() }) => {
    const [appointments, setAppointments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchAppointments = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                if (isMounted) {
                    setError("User is not authenticated.");
                    setIsLoading(false);
                }
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const [
                    appointmentsResponse,
                    treatmentsResponse,
                ] = await Promise.all([
                    axios.get(
                        `${API_URL}/api/v1/appointments/user-appointments`,
                        config
                    ),
                    axios.get(
                        `${API_URL}/api/v1/treatments`,
                        config
                    ),
                ]);

                if (!isMounted) return;

                setAppointments(
                    Array.isArray(appointmentsResponse.data)
                        ? appointmentsResponse.data
                        : []
                );

                setTreatments(
                    Array.isArray(treatmentsResponse.data)
                        ? treatmentsResponse.data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to fetch appointments or treatments:",
                    error
                );

                if (isMounted) {
                    if (error.response?.status === 401) {
                        setError(
                            "Your session has expired. Please log in again."
                        );
                    } else if (error.response?.status === 403) {
                        setError(
                            "You do not have permission to access this resource."
                        );
                    } else if (error.response?.status === 404) {
                        setError(
                            "The requested resource was not found."
                        );
                    } else {
                        setError(
                            "An error occurred while fetching appointments or treatments."
                        );
                    }
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchAppointments();

        return () => {
            isMounted = false;
        };
    }, []);

    const getTreatmentName = (treatmentId) => {
        const treatment = treatments.find(
            (item) => String(item.id) === String(treatmentId)
        );

        return treatment
            ? treatment.name
            : "Treatment";
    };

    const formatAppointmentDate = (date) => {
        if (!date) {
            return "Not available";
        }

        const parsedDate = new Date(`${date}T12:00:00`);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Not available";
        }

        return parsedDate.toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStatusClass = (status) => {
        if (!status) return "";

        return String(status)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    return (
        <main className="my-appointments-page">
            {/* Hero section */}
            <header className="my-appointments-header">
                <Link to="/" className="my-appointments-brand">
                    <span className="brand-icon">✧</span>

                    <span className="brand-name">
                        Blissful <em>&amp; Balance</em>
                    </span>
                </Link>

                <span className="appointments-eyebrow">
                    YOUR WELLNESS, YOUR TIME
                </span>

                <h1>
                    My <em>appointments.</em>
                </h1>

                <p>
                    Your wellness journey, all in one place.
                    View the details of your bookings below.
                </p>
            </header>

            {/* Loading state */}
            {isLoading ? (
                <div
                    className="appointments-loading"
                    role="status"
                    aria-live="polite"
                >
                    Loading your appointments...
                </div>
            ) : error ? (
                /* Error state */
                <div
                    className="appointments-message appointments-error"
                    role="alert"
                >
                    {error}
                </div>
            ) : appointments.length === 0 ? (
                /* Empty state */
                <section className="appointments-empty">
                    <h2>No appointments yet</h2>

                    <p>
                        You haven't made any bookings yet.
                        When you book a treatment, it will appear here.
                    </p>

                    <Link
                        to="/appointment"
                        className="appointments-book-button"
                    >
                        Book an appointment
                    </Link>
                </section>
            ) : (
                /* Appointment list */
                <section className="appointments-list">
                    <div className="appointments-count">
                        {appointments.length}{" "}
                        {appointments.length === 1
                            ? "appointment"
                            : "appointments"}
                    </div>

                    {appointments.map((appointment) => (
                        <article
                            className="my-appointment-card"
                            key={appointment.id}
                        >
                            {/* Treatment heading and status */}
                            <div className="my-appointment-card-top">
                                <div>
                                    <span className="appointment-card-label">
                                        YOUR TREATMENT
                                    </span>

                                    <h2>
                                        {getTreatmentName(
                                            appointment.treatmentId
                                        )}
                                    </h2>
                                </div>

                                {appointment.status && (
                                    <span
                                        className={`my-appointment-status ${getStatusClass(
                                            appointment.status
                                        )}`}
                                    >
                                        {appointment.status}
                                    </span>
                                )}
                            </div>

                            {/* Booking details */}
                            <div className="my-appointment-details">
                                <div>
                                    <span>Booking reference</span>
                                    <strong>
                                        {appointment.id ?? "Not available"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Date</span>
                                    <strong>
                                        {formatAppointmentDate(
                                            appointment.appointmentDate
                                        )}
                                    </strong>
                                </div>

                                <div>
                                    <span>Title</span>
                                    <strong>
                                        {appointment.title || "Not specified"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Number of guests</span>
                                    <strong>
                                        {(
                                            appointment.numberOfGuests ??
                                            appointment.numberOfGuest
                                        ) ?? "Not specified"}
                                    </strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            {/* Footer */}
            <footer className="appointment-footer">
                <Link to="/" className="appointment-brand">
                    Blissful <span>&amp;</span> Balance
                </Link>

                <p>
                    © {currentYear} Blissful &amp; Balance.
                    All rights reserved.
                </p>

                <div className="appointment-socials">
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
        </main>
    );
};

export default MyAppointments;
