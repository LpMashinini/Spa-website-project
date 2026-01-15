import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import appointmentsRoutes from "../src/routes/appointmentsRoutes.js"
import rate_limiter from "../src/middleware/rateLimiter.js"

dotenv.config()

const app = express();
const PORT = 5001;


// middleware
app.use(express.json());
app.use(cors());
app.use(rate_limiter);


app.use("/api/appointment", rate_limiter, appointmentsRoutes)


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
