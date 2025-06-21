const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [String],
            required: true,
            validate: {
                validator: (arr) => arr.length >= 2,
                message: 'At least two options are required',
            },
        },
        correctAnswers: {
            type: [Number], // index of correct options
            required: true,
            validate: {
                validator: function (arr) {
                    return (
                        Array.isArray(arr) &&
                        arr.every((index) => typeof index === 'number' && index >= 0 && index < this.options.length)
                    );
                },
                message: 'Each correct answer must be a valid index of the options array.',
            },
        },
        explanation: {
            type: String,
            default: '',
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
        tags: {
            type: [String],
            default: [],
        },

        // New fields
        type: {
            type: String,
            enum: ['mock', 'test'],
            required: true,
        },
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const McqModel = mongoose.model('MCQ', mcqSchema);
module.exports = McqModel;
