import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [String],
            validate: [arrayLimit, 'At least two options are required'],
        },
        correctAnswers: {
            type: [Number], // array of indexes (e.g., [1, 3])
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.every(index => typeof index === 'number' && index >= 0 && index < this.options.length);
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
        tags: [String], // Optional, like ['JavaScript', 'React']
    },
    {
        timestamps: true,
    }
);

function arrayLimit(val) {
    return val.length >= 2;
}

export default mongoose.model('MCQ', mcqSchema);
