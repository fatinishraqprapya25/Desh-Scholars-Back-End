const mongoose = require("mongoose");

const mockSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: String,
            required: true,
            min: 1,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        price: {
            type: String,
            default: "0"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Mock = mongoose.model("Mock", mockSchema);

module.exports = Mock;
