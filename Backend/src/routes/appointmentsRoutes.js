import express from "express"
import { createAppointment } from "../Controllers/appointmentController.js"

const router = express.Router();

router.post("/",createAppointment);

export default router;