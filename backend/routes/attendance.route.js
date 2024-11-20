import express from "express";
import { AttendanceController } from "../controllers/attendance.controller.js"; // Import the AttendanceController

const router = express.Router();

// Route for fetching all attendance records
router.get("/", AttendanceController.getAllAttendance);

// Route for adding a new attendance record
router.post("/", AttendanceController.addAttendance);


// Route for updating attendance by ID
router.put("/:attendanceId", AttendanceController.editAttendance);

// Route for removing attendance by ID
router.delete("/:attendanceId", AttendanceController.removeAttendance);

// Route for searching attendance by student ID
router.get("/search", AttendanceController.searchAttendanceByStudentId);

export default router;
