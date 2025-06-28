const Review = require('./review.model');
const sendResponse = require("../../utils/sendResponse");

const reviews = {};

reviews.createReview = async (req, res) => {
    try {
        const { questionId, userId, subject } = req.body;

        const existingReview = await Review.findOne({ questionId, userId });

        if (existingReview) {
            const deleted = await Review.findOneAndDelete({ userId, questionId });

            return sendResponse(res, 400, {
                success: false,
                message: "Review Deleted"
            });
        }

        const review = await Review.create({ questionId, userId, subject });

        return sendResponse(res, 200, {
            success: true,
            message: "review created successfully!",
            data: review
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while creating review",
            error: error.message
        });
    }
};

reviews.getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review.find().sort({ createdAt: -1 });

        return sendResponse(res, 200, {
            success: true,
            message: "Reviews fetched successfully",
            data: allReviews
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching reviews",
            error: error.message
        });
    }
};

reviews.getReviewById = async (req, res) => {
    console.log("hi", req.body);
    try {
        const { questionId, userId } = req.body;
        const review = await Review.findOne({ questionId, userId });

        if (!review) {
            return sendResponse(res, 404, {
                success: false,
                message: "Review not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Review fetched successfully",
            data: review
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching review",
            error: error.message
        });
    }
};

reviews.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionId } = req.body;

        if (!questionId) {
            return sendResponse(res, 400, {
                success: false,
                message: "No updatable fields provided (e.g., questionId)."
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { questionId },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return sendResponse(res, 404, {
                success: false,
                message: "Review not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Review updated successfully",
            data: updatedReview
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while updating review",
            error: error.message
        });
    }
};

reviews.deleteReview = async (req, res) => {
    try {
        const { userId, questionId } = req.params;
        const deleted = await Review.findOneAndDelete({ userId, questionId });

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: "Review not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while deleting review",
            error: error.message
        });
    }
};

module.exports = reviews;
