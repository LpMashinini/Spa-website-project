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
        }
        
    }, []);



    return (
        <div>

        </div>
    )
}

export default MyAppointments
