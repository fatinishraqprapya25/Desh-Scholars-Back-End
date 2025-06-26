const mockQuestionFeatures = require("./mockQuestions.features");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const mockQuestionRouter = require("express").Router();

mockQuestionRouter.post("/", verifyAdmin, mockQuestionFeatures.createMockQuestion);
mockQuestionRouter.get("/", mockQuestionFeatures.getAllMockQuestions);
mockQuestionRouter.get("/:mockId", mockQuestionFeatures.getMockQuestionById);
mockQuestionRouter.put("/:id", verifyAdmin, mockQuestionFeatures.updateMockQuestion);
mockQuestionRouter.delete("/:id", verifyAdmin, mockQuestionFeatures.deleteMockQuestion);

module.exports = mockQuestionRouter;