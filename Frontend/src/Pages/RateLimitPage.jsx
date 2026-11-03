import React from 'react'
import "./RateLimitPage.css"
import RateLimitImg from "../../assets/rate_limit.jpg"

const RateLimitPage = () => {
  return (

    <div className="">

      <div>
        <img src={RateLimitImg} alt="Rate Limit" />
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
