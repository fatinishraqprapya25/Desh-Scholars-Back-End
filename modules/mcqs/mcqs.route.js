const mcqRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const mcqFeatures = require("./mcqs.features");

mcqRouter.post("/", verifyAdmin, mcqFeatures.createMcq);
mcqRouter.get("/", mcqFeatures.findMcqs);
mcqRouter.get("/:testId", mcqFeatures.getMcqsByTestId);
mcqRouter.post("/questions/aggregated", mcqFeatures.getAggrigiatedMcqs);
mcqRouter.get("/count/:testId", mcqFeatures.getMcqsByTestId);
mcqRouter.put("/:id", mcqFeatures.updateMcq);
mcqRouter.delete("/:id", verifyAdmin, mcqFeatures.deleteMcq);

module.exports = mcqRouter;