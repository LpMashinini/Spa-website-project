import mysql from "mysql2"
import express, { json } from "express"

export async function createAppointment(req, res) {

    // Database connection
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "spa"
    });

    try {

        const sql = "INSERT INTO appointment (`name`,`email`,`phone`,`guest`,`title`,`treatment`,`arrival_Date`) VALUES(?,?,?,?,?,?,?)";

        const values = [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.guest,
            req.body.title,
            req.body.treatment,
            req.body.arrival
        ];

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ ERROR: "Error Inserting data to database" });
            res.status(201).json({ status: "success" })
            db.end();
        })

    } catch (err) {

        console.error("Error occurred in createAppointment controller", err);

        res.status(500).json({
            message: "Internal server error"
        })

    }
}