import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: "Student", // References the Student schema
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        maxlength: 20,
        required: true
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
