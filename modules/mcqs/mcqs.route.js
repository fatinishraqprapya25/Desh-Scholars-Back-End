const mcqRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const mcqFeatures = require("./mcqs.features");

mcqRouter.post("/", verifyAdmin, mcqFeatures.createMcq);
mcqRouter.get("/:testId", mcqFeatures.getMcqsByTestId);
mcqRouter.put("/:id", mcqFeatures.getMcqsByTestId);
mcqRouter.delete("/:id", verifyAdmin, mcqFeatures.deleteMcq);

module.exports = mcqRouter;