const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        phone: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        about: {
            type: String,
        },
        profile: {
            type: String
        },
        major: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
