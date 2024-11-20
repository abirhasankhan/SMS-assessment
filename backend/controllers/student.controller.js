import { Student } from "../models/student.model.js";

export const StudentController = {
    addStudent: async (req, res) => {
        try {
            const { firstName, lastName, dob, email, phone, address, classId, medicalHistory, remarks } = req.body;
            const newStudent = new Student({ firstName, lastName, dob, email, phone, address, classId, medicalHistory, remarks });
            await newStudent.save();
            res.status(201).json({ message: "Student added successfully.", newStudent });
        } catch (error) {
            res.status(500).json({ message: "Failed to add student.", error: error.message });
        }
    },

    editStudent: async (req, res) => {
        try {
            const { studentId } = req.params;
            const updates = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, { new: true });
            if (!updatedStudent) return res.status(404).json({ message: "Student not found." });
            res.status(200).json({ message: "Student updated successfully.", updatedStudent });
        } catch (error) {
            res.status(500).json({ message: "Failed to update student.", error: error.message });
        }
    },

    removeStudent: async (req, res) => {
        try {
            const { studentId } = req.params;
            const removedStudent = await Student.findByIdAndDelete(studentId);
            if (!removedStudent) return res.status(404).json({ message: "Student not found." });
            res.status(200).json({ message: "Student removed successfully.", removedStudent });
        } catch (error) {
            res.status(500).json({ message: "Failed to remove student.", error: error.message });
        }
    },

    searchStudentByName: async (req, res) => {
        try {
            const { name } = req.query;
            if (!name) return res.status(400).json({ message: "Name query parameter is required." });
            const students = await Student.find({
                $or: [
                    { firstName: { $regex: name, $options: "i" } },
                    { lastName: { $regex: name, $options: "i" } }
                ]
            });
            if (students.length === 0) return res.status(404).json({ message: "No students found." });
            res.status(200).json({ students });
        } catch (error) {
            res.status(500).json({ message: "Failed to search students.", error: error.message });
        }
    },

     // Fetch all students
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
