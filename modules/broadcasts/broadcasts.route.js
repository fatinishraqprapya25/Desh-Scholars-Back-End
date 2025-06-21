const broadcastsFeatures = require("./broadcasts.features");

const broadcastRouter = require("express").Router();

broadcastRouter.post("/", broadcastsFeatures.createBroadcast);
broadcastRouter.get("/", broadcastsFeatures.getAllBroadcasts);
broadcastRouter.get("/:id", broadcastsFeatures.getBroadcastById);
broadcastRouter.put("/:id", broadcastsFeatures.updateBroadcast);
broadcastRouter.delete("/:id", broadcastsFeatures.deleteBroadcast);

module.exports = broadcastRouter;