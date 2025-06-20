const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Test = mongoose.model('Test', testSchema);

export default Test;
