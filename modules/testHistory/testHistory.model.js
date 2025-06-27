const mongoose = require("mongoose");

const testHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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
            default: "1"
        }
    }
);

const TestHistory = mongoose.model("TestHistory", testHistorySchema);
module.exports = TestHistory;
