import { Attendance } from "../models/attendance.model.js";

export const AttendanceController = {
    addAttendance: async (req, res) => {
        try {
            const { studentId, date, status, remarks } = req.body;
            const newAttendance = new Attendance({ studentId, date, status, remarks });
            await newAttendance.save();
            res.status(201).json({ message: "Attendance added successfully.", newAttendance });
        } catch (error) {
            res.status(500).json({ message: "Failed to add attendance.", error: error.message });
        }
    },

    editAttendance: async (req, res) => {
        try {
            const { attendanceId } = req.params;
            const updates = req.body;
            const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, updates, { new: true });
            if (!updatedAttendance) return res.status(404).json({ message: "Attendance not found." });
            res.status(200).json({ message: "Attendance updated successfully.", updatedAttendance });
        } catch (error) {
            res.status(500).json({ message: "Failed to update attendance.", error: error.message });
        }
    },

    removeAttendance: async (req, res) => {
        try {
            const { attendanceId } = req.params;
            const removedAttendance = await Attendance.findByIdAndDelete(attendanceId);
            if (!removedAttendance) return res.status(404).json({ message: "Attendance not found." });
            res.status(200).json({ message: "Attendance removed successfully.", removedAttendance });
        } catch (error) {
            res.status(500).json({ message: "Failed to remove attendance.", error: error.message });
        }
    },

    searchAttendanceByStudentId: async (req, res) => {
        try {
            const { studentId } = req.query;
            if (!studentId) return res.status(400).json({ message: "Student ID query parameter is required." });
            const attendances = await Attendance.find({ studentId });
            if (attendances.length === 0) return res.status(404).json({ message: "No attendance records found." });
            res.status(200).json({ attendances });
        } catch (error) {
            res.status(500).json({ message: "Failed to search attendance.", error: error.message });
        }
    },

    // Fetch all attendance records
    getAllAttendance: async (req, res) => {
        try {
            const attendance = await Attendance.find();
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
