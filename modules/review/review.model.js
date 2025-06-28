const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
