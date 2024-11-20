import { Exam } from "../models/exam.model.js";

export const ExamController = {
    addExam: async (req, res) => {
        try {
            const { classId, examDate, remarks } = req.body;
            const newExam = new Exam({ classId, examDate, remarks });
            await newExam.save();
            res.status(201).json({ message: "Exam added successfully.", newExam });
        } catch (error) {
            res.status(500).json({ message: "Failed to add exam.", error: error.message });
        }
    },

    editExam: async (req, res) => {
        try {
            const { examId } = req.params;
            const updates = req.body;
            const updatedExam = await Exam.findByIdAndUpdate(examId, updates, { new: true });
            if (!updatedExam) return res.status(404).json({ message: "Exam not found." });
            res.status(200).json({ message: "Exam updated successfully.", updatedExam });
        } catch (error) {
            res.status(500).json({ message: "Failed to update exam.", error: error.message });
        }
    },

    removeExam: async (req, res) => {
        try {
            const { examId } = req.params;
            const removedExam = await Exam.findByIdAndDelete(examId);
            if (!removedExam) return res.status(404).json({ message: "Exam not found." });
            res.status(200).json({ message: "Exam removed successfully.", removedExam });
        } catch (error) {
            res.status(500).json({ message: "Failed to remove exam.", error: error.message });
        }
    },

    searchExam: async (req, res) => {
        try {
            const { classId, examDate } = req.query;
            const filters = {};
            if (classId) filters.classId = classId;
            if (examDate) filters.examDate = examDate;

            const exams = await Exam.find(filters);
            if (exams.length === 0) return res.status(404).json({ message: "No exams found." });
            res.status(200).json({ exams });
        } catch (error) {
            res.status(500).json({ message: "Failed to search exams.", error: error.message });
        }
    },

    // Fetch all exams
    async getAllExams(req, res) {
        try {
            const exams = await Exam.find();
            res.status(200).json(exams);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
