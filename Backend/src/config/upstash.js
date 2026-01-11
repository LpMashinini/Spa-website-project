// import {Ratelimit}
// import { Redis }


// import dotenv from "dotenv";

// dotenv.config();


// This creates a ratelimiter that allows 10 requests per 20 seconds

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
});

export default ratelimit;