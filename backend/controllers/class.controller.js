import { Class } from "../models/class.model.js";

export const ClassController = {
    addClass: async (req, res) => {
        try {
            const { className, teacherId, remarks } = req.body;
            const newClass = new Class({ className, teacherId, remarks });
            await newClass.save();
            res.status(201).json({ message: "Class added successfully.", newClass });
        } catch (error) {
            res.status(500).json({ message: "Failed to add class.", error: error.message });
        }
    },

    editClass: async (req, res) => {
        try {
            const { classId } = req.params;
            const updates = req.body;
            const updatedClass = await Class.findByIdAndUpdate(classId, updates, { new: true });
            if (!updatedClass) return res.status(404).json({ message: "Class not found." });
            res.status(200).json({ message: "Class updated successfully.", updatedClass });
        } catch (error) {
            res.status(500).json({ message: "Failed to update class.", error: error.message });
        }
    },

    removeClass: async (req, res) => {
        try {
            const { classId } = req.params;
            const removedClass = await Class.findByIdAndDelete(classId);
            if (!removedClass) return res.status(404).json({ message: "Class not found." });
            res.status(200).json({ message: "Class removed successfully.", removedClass });
        } catch (error) {
            res.status(500).json({ message: "Failed to remove class.", error: error.message });
        }
    },

    searchClassByName: async (req, res) => {
        try {
            const { name } = req.query;
            if (!name) return res.status(400).json({ message: "Name query parameter is required." });
            const classes = await Class.find({ className: { $regex: name, $options: "i" } });
            if (classes.length === 0) return res.status(404).json({ message: "No classes found." });
            res.status(200).json({ classes });
        } catch (error) {
            res.status(500).json({ message: "Failed to search classes.", error: error.message });
        }
    },

    // Fetch all classes
    getAllClasses: async (req, res) => {
        try {
            const classes = await Class.find();
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
