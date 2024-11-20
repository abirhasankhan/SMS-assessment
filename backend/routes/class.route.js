import express from "express";
import { ClassController } from "../controllers/class.controller.js"; // Import ClassController

const router = express.Router();

// Route for fetching all classes
router.get("/", ClassController.getAllClasses);

// Route for adding a new class
router.post("/", ClassController.addClass);


// Route for updating a class by ID
router.put("/:classId", ClassController.editClass);

// Route for removing a class by ID
router.delete("/:classId", ClassController.removeClass);

// Route for searching classes by name
router.get("/search", ClassController.searchClassByName);

export default router;
