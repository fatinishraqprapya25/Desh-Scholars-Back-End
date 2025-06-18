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
        bio: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
