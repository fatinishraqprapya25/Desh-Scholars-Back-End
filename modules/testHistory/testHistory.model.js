const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ["Correct", "Incorrect"]
        },
        attempt: {
            type: String,
            default: "0"
        }
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
