import express, { json } from "express"
import cors from "cors"
import appointmentsRoutes from "./routes/appointmentsRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
const PORT = 5001;


// middleware
app.use(express.json());
app.use(cors());
app.use(rateLimiter());


// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "spa"
})

app.use("/api/appointment", appointmentsRoutes)

// Post data to database

// app.post('/api/', (req,res) => {

//     const sql = "INSERT INTO appointment (`name`,`email`,`phone`,`guest`,`title`,`treatment`,`arrival`) VALUES(?,?,?,?,?,?,?)";


//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.phone,
//         req.body.guest,
//         req.body.title,
//         req.body.treatment,
//         req.body.arrival
//     ]

//     db.query(sql, user, (err, result) => {
//         if (err) return res,json({ERROR: "Error Inserting data to database"});
//         res.json({status: "success"})
//     })
// })

// listen


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
