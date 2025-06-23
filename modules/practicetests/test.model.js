const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String,
        required: true
    }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
