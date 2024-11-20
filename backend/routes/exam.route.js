import express from "express";
import { ExamController } from "../controllers/exam.controller.js"; // Import the ExamController

const router = express.Router();

// Route for fetching all exams
router.get("/", ExamController.getAllExams);

// Route for adding a new exam
router.post("/", ExamController.addExam);


// Route for updating an exam by ID
router.put("/:examId", ExamController.editExam);

// Route for removing an exam by ID
router.delete("/:examId", ExamController.removeExam);

// Route for searching exams by class ID or exam date
router.get("/search", ExamController.searchExam);

export default router;
