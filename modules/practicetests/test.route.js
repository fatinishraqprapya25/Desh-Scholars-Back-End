const verifyAdmin = require("../../middlewares/VerifyAdmin");
const testFeatures = require("./test.features");

const testRouter = require("express").Router();

testRouter.post("/", verifyAdmin, testFeatures.createTest);
testRouter.get("/", testFeatures.getAllTests);
testRouter.get("/:id", testFeatures.getTestById);
testRouter.put("/:id", verifyAdmin, testFeatures.updateTest);
testRouter.delete("/:id", verifyAdmin, testFeatures.deleteTest);

module.exports = testRouter;