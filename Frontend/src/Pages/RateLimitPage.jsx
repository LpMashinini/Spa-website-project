import React from 'react'
import "./RateLimit.css"
import RateLimitImg from "../assets/RateLimit.jpg"

const RateLimitPage = () => {
  return (

    <div className="rate-limit-page">

      <div className="rate-limit-content">
        <img 
        src={RateLimitImg} 
        alt="Rate Limit" 
        className="rate-limit-illustration"
        />
        <h1>Oops! Too many Requests</h1>

        <p>
          You have exceeded the rate limit for requests. 
          Please try again later.
        </p>
      </div>
    </div>
  );
};

export default RateLimitPage
