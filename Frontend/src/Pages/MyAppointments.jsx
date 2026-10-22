import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyAppointment.css";

const API_URL = "";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        let isMounted = true; // Flag to track if the component is mounted

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

                const [appointmentsResponse, treatmentsResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/v1/appointments/user-appointments`, config),
                    axios.get(`${API_URL}/api/v1/treatments`, config),
                ]);

                if (!isMounted) return; // Exit if the component is unmounted

                setAppointments(
                    Array.isArray(appointmentsResponse.data)
                        ? appointmentsResponse.data
                        : [],
                );

                setTreatments(
                    Array.isArray(treatmentsResponse.data) ? treatmentsResponse.data : [],
                );
            } catch (error) {
                console.error("Failed to fetch appointments or treatments:", error);

                if (isMounted) {
                    if (error.response && error.response.status === 401) {
                        setError("Your session has expired. Please log in again.");
                    } else if (error.response && error.response.status === 403) {
                        setError("You do not have permission to access this resource.");
                    } else if (error.response && error.response.status === 404) {
                        setError("The requested resource was not found.");
                    } else {
                        setError(
                            "An error occurred while fetching appointments or treatments.",
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
            isMounted = false; // Cleanup function to set the flag to false when the component unmounts
        };
    }, []);

    const getTreatmentName = (treatmentId) => {
        const treatment = treatments.find(
            (item) => String(item.id) === String(treatmentId),
        );

        return treatment ? treatment.name : "Treatment";
    };

    if (isLoading) {
        return (
            <main>
                <p>Loading appointments...</p>
            </main>
        );
    }

    return (
        <main className="my-appointments-page">
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
                    Your wellness journey, all in one place. View the details of your
                    bookings below.
                </p>
            </header>

            {error ? (
                <div className="appointments-message appointments-error" role="alert">
                    {error}
                </div>
            ) : appointments.length === 0 ? (
                <section className="appointments-empty">
                    <h2>No appointments yet</h2>
                    <p>
                        You haven't made any bookings yet. When you book a treatment, it
                        will appear here.
                    </p>

                    <Link to="/appointment" className="appointments-book-button">
                        Book an appointment
                    </Link>
                </section>
            ) : (
                <section className="appointments-list">
                    <div className="appointments-count">
                        {appointments.length}{" "}
                        {appointments.length === 1 ? "appointment" : "appointments"}
                    </div>

                    {appointments.map((appointment) => (
                        <article className="my-appointment-card" key={appointment.id}>
                            <div className="my-appointment-card-top">
                                <div>
                                    <span className="appointment-card-label">YOUR TREATMENT</span>

                                    <h2>{getTreatmentName(appointment.treatmentId)}</h2>
                                </div>

                                {appointment.status && (
                                    <span
                                        className={`my-appointment-status ${String(
                                            appointment.status,
                                        ).toLowerCase()}`}
                                    >
                                        {appointment.status}
                                    </span>
                                )}
                            </div>

                            <div className="my-appointment-details">
                                <div>
                                    <span>Booking reference</span>
                                    <strong>{appointment.id}</strong>
                                </div>

                                <div>
                                    <span>Date</span>
                                    <strong>
                                        {appointment.appointmentDate
                                            ? new Date(
                                                `${appointment.appointmentDate}T12:00:00`,
                                            ).toLocaleDateString("en-ZA", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "Not available"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Title</span>
                                    <strong>{appointment.title || "Not specified"}</strong>
                                </div>

                                <div>
                                    <span>Number of guests</span>
                                    <strong>
                                        {appointment.numberOfGuests ?? "Not specified"}
                                    </strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            <footer className="my-appointments-footer">
                <Link to="/">Return home</Link>
                <Link to="/appointment">Book another treatment</Link>
            </footer>
        </main>
    );
};

export default MyAppointments;
