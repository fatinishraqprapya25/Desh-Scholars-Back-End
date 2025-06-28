const reviewRouter = require("express").Router();
const reviewFeatures = require("./review.features");

reviewRouter.post("/", reviewFeatures.createReview);
reviewRouter.get("/", reviewFeatures.getAllReviews);
reviewRouter.post("/user", reviewFeatures.getReviewById);

module.exports = reviewRouter;