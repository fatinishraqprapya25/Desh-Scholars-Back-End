const mockRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const mockFeatures = require("./mock.features");

mockRouter.post("/", verifyAdmin, mockFeatures.createMock);
mockRouter.get("/", mockFeatures.getAllMocks);
mockRouter.get("/:id", mockFeatures.getMockById);
mockRouter.put("/:id", verifyAdmin, mockFeatures.updateMock);
mockRouter.delete("/:id", verifyAdmin, mockFeatures.deleteMock);

module.exports = mockRouter;