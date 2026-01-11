import appointmentDb from "../Backend/models/appointmentDb.js"

export async function createAppointment(req, res) {

    try {

        const sql = "INSERT INTO appointment (`name`,`email`,`phone`,`guest`,`title`,`treatment`,`arrival`) VALUES(?,?,?,?,?,?,?)";

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
            if (err) return res, json({ ERROR: "Error Inserting data to database" });
            res.json({ status: "success" })
        })

        const db = new appointmentDb();

    } catch (err) {

        console.error("Error occurred in createAppointment controller", err);

        res.status(500).json({
            message: "Internal server error"
        })

    }
}