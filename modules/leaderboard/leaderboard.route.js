const leaderboardFeatures = require("./loaderboard.features");

const leaderboardRouter = require("express").Router();

leaderboardRouter.get("/", leaderboardFeatures.getTestsLeaderBoard);

module.exports = leaderboardRouter;