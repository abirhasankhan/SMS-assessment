import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        maxlength: 50
    },
    teacherId: {
        type: String,
        ref: "Teacher", // References the Teacher schema
        default: null
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt
});

export const Class = mongoose.model("Class", classSchema);
