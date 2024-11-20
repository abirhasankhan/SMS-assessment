import express from "express";
import { TeacherController } from "../controllers/teacher.controller.js"; // Import TeacherController

const router = express.Router();

// Route for fetching all teachers
router.get("/", TeacherController.getAllTeachers);

// Route for adding a new teacher
router.post("/", TeacherController.addTeacher);

// Route for fetching a teacher by ID
router.get("/:teacherId", TeacherController.getTeacherById);

// Route for updating a teacher by ID
router.put("/:teacherId", TeacherController.editTeacher);

// Route for removing a teacher by ID
router.delete("/:teacherId", TeacherController.removeTeacher);

// Route for searching teachers by name
router.get("/search", TeacherController.searchTeacherByName);

export default router;
