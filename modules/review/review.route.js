const reviewRouter = require("express").Router();
const reviewFeatures = require("./review.features");

reviewRouter.post("/", reviewFeatures.createReview);
reviewRouter.get("/", reviewFeatures.getAllReviews);
reviewRouter.get("/:d", reviewFeatures.getReviewById);
reviewRouter.put("/:d", reviewFeatures.updateReview);

module.exports = reviewRouter;