const paymentFeatures = require("./payment.feature");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const paymentRouter = require("express").Router();

paymentRouter.post("/", paymentFeatures.createPayment);
paymentRouter.get("/", verifyAdmin, paymentFeatures.getAllPayments);
paymentRouter.get("/:id", verifyAdmin, paymentFeatures.getPaymentById);
paymentRouter.get("/status/approved", verifyAdmin, paymentFeatures.getApprovedPayments);
paymentRouter.get("/earnings/monthly", verifyAdmin, paymentFeatures.getMonthlyEarnings);
paymentRouter.put("/:id", verifyAdmin, paymentFeatures.updatePaymentStatus);

module.exports = paymentRouter;