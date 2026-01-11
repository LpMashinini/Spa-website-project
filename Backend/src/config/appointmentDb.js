import mysql from "mysql2"

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "spa"
})