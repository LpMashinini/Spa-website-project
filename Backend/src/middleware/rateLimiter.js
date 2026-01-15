import rateLimit from "express-rate-limit"


const rate_limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message:{
        error: 'Too many requests made try again later',
        retryAfter: '15 minutes'
    },

    handler: (req, res) => {
        res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'Too many requests from this IP, please try again later'
        });
    }
})

export default rate_limiter