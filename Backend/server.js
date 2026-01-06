import express, { json } from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express();
const PORT = 5001;


// middleware
app.use(express.json());
app.use(cors());


// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "spa"
})

// Post data to database

app.post('/appointment', (req,res) => {

    const sql = "INSERT INTO appointment (`name`,`email`,`phone`,`guest`,`title`,`treatment`,`arrival`) VALUES(?,?,?,?,?,?,?)";


    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.guest,
        req.body.title,
        req.body.treatment,
        req.body.arrival
    ]

    db.query(sql, user, (err, result) => {
        if (err) return res,json({ERROR: "Error Inserting data to database"});
        res.json({status: "success"})
    })
})

// listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})