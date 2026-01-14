import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"


import dotenv from "dotenv";

dotenv.config();


// This creates a ratelimiter that allows 10 requests per 20 seconds

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "60 s")
});

export default ratelimit;