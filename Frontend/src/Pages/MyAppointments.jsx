import React, { useState, useEffect } from "react";
import axios from "axios";



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

            if(!token){

                if(isMounted) {
                    setError("User is not authenticated.");
                    setIsLoading(false);
                }

                return;
            }

            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },

                const [appointmentsResponse, treatmentsResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/v1/appointments/my-appointments`, config),
                    axios.get(`${API_URL}/api/v1/treatments`, config)
                ]);

                if(!isMounted) return; // Exit if the component is unmounted

                setAppointments(
                    Array.isArray(appointmentsResponse.data) ? appointmentsResponse.data : []
                );

                setTreatments(
                    Array.isArray(treatmentsResponse.data) ? treatmentsResponse.data : []
                );
                
            } catch (error) {
                console.error("Failed to fetch appointments or treatments:", error);

                if(isMounted) {

                    if (error.response && error.response.status === 401) {
                        setError("Your session has expired. Please log in again.");
                    } else if (error.response && error.response.status === 403) {
                        setError("You do not have permission to access this resource.");
                    } else if (error.response && error.response.status === 404) {
                        setError("The requested resource was not found.");
                    } else {
                        setError("An error occurred while fetching appointments or treatments.");
                    }
                }

            } finally {

                if(isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchAppointments();

        return () => {
            isMounted = false; // Cleanup function to set the flag to false when the component unmounts
        };

    
    }, []);



    return (
        <div>

        </div>
    )
}

export default MyAppointments
