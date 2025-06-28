const Review = require('./review.model');
const sendResponse = require("../../utils/sendResponse");

const reviews = {};

reviews.createReview = async (req, res) => {
    try {
        const { questionId } = req.body;
        if (!questionId) {
            return sendResponse(res, 400, false, "questionId is required.");
        }

        const review = await Review.create({
            questionId,
        });

        return sendResponse(res, 201, true, 'Review created successfully', review);

    } catch (error) {
        return sendResponse(res, 500, false, 'Server error while creating review', null, error.message);
    }
};

reviews.getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review.find().sort({ createdAt: -1 });
        return sendResponse(res, 200, true, 'Reviews fetched successfully', allReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return sendResponse(res, 500, false, 'Server error while fetching reviews', null, error.message);
    }
};

reviews.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        if (!review) {
            return sendResponse(res, 404, false, 'Review not found');
        }

        return sendResponse(res, 200, true, 'Review fetched successfully', review);
    } catch (error) {
        console.error('Error fetching review by ID:', error);
        return sendResponse(res, 500, false, 'Server error while fetching review', null, error.message);
    }
};

reviews.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionId } = req.body;

        const updatedFields = {};
        if (questionId) {
            updatedFields.questionId = questionId;
        } else {
            return sendResponse(res, 400, false, "No updatable fields provided (e.g., questionId).");
        }


        const updatedReview = await Review.findByIdAndUpdate(id, updatedFields, {
            new: true, 
            runValidators: true,
        });

        if (!updatedReview) {
            return sendResponse(res, 404, false, 'Review not found');
        }

        return sendResponse(res, 200, true, 'Review updated successfully', updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        return sendResponse(res, 500, false, 'Server error while updating review', null, error.message);
    }
};

reviews.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.findByIdAndDelete(id);

        if (!deleted) {
            return sendResponse(res, 404, false, 'Review not found');
        }

        return sendResponse(res, 200, true, 'Review deleted successfully');
    } catch (error) {
        console.error('Error deleting review:', error);
        return sendResponse(res, 500, false, 'Server error while deleting review', null, error.message);
    }
};

module.exports = reviews;
