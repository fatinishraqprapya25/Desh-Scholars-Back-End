const leaderboardFeatures = require("./loaderboard.features");

const leaderboardRouter = require("express").Router();

leaderboardRouter.get("/", leaderboardFeatures.getTestsLeaderBoard);
leaderboardRouter.get("/:userId", leaderboardFeatures.getUserRank);

module.exports = leaderboardRouter;