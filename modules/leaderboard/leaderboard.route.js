const leaderboardFeatures = require("./loaderboard.features");

const leaderboardRouter = require("express").Router();

leaderboardRouter.get("/", leaderboardFeatures.getTestsLeaderBoard);
leaderboardRouter.get("/:userId", leaderboardFeatures.getUserRank);
leaderboardRouter.get("/a/summery", leaderboardFeatures.getLeaderboardSummary);

module.exports = leaderboardRouter;