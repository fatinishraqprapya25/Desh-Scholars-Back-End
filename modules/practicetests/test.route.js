const testFeatures = require("./test.features");

const testRouter = require("express").Router();

testRouter.post("/", testFeatures.createTest);
testRouter.get("/", testFeatures.getAllTests);
testRouter.get("/:id", testFeatures.getTestById);
testRouter.put("/:id", testFeatures.updateTest);
testRouter.delete("/:id", testFeatures.deleteTest);

module.exports = testRouter;