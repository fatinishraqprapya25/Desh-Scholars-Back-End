const mockRouter = require("express").Router();
const mockFeatures = require("./mock.features");

mockRouter.post("/", mockFeatures.createMock);
mockRouter.get("/", mockFeatures.getAllMocks);
mockRouter.get("/:id", mockFeatures.getMockById);
mockRouter.put(":/id", mockFeatures.updateMock);

module.exports = mockRouter;