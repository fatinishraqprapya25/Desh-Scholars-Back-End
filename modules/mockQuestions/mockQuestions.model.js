const mongoose = require("mongoose");

const mockQuestionSchema = new mongoose.Schema(
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
            type: [Number],
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
        moduleName: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
        tags: {
            type: [String],
            default: ["bluebook only", "exclude bluebook"],
            required: true
        },
        scoreBond: {
            type: String,
            enum: ["1", "2", "3", "4", "5", "6", "7"],
            required: true
        },
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

const mockQuestion = mongoose.model('MockQuestionModel', mockQuestionSchema);
module.exports = mockQuestion;
