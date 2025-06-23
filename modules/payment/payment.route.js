const paymentFeatures = require("./payment.feature");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const paymentRouter = require("express").Router();

paymentRouter.post("/", paymentFeatures.createPayment);
paymentRouter.get("/", verifyAdmin, paymentFeatures.getAllPayments);
paymentRouter.get("/:id", paymentFeatures.getPaymentById);
paymentRouter.put("/:id", paymentFeatures.updatePaymentStatus);

module.exports = paymentRouter;