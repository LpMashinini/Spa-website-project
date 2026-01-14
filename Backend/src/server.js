import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import appointmentsRoutes from "../src/routes/appointmentsRoutes.js"
// import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config()

const app = express();
const PORT = 5001;


// middleware
app.use(express.json());
app.use(cors());
// app.use(rateLimiter);


app.use("/api/appointment", appointmentsRoutes)


app.listen(PORT, (res,req)=>{
    console.log(`Server running on port ${PORT}`);
})
