const adminRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const adminFeatures = require("./admin.features");
const { default: adminValidations } = require("./admin.validations");

adminRouter.post("/", verifyAdmin, validateRequest(adminValidations.createAdminSchema), verifyAdmin, adminFeatures.createAdmin);
adminRouter.post("/login", validateRequest(adminValidations.loginAdminSchema), adminFeatures.loginAdmin);
adminRouter.get("/validate-admin", adminFeatures.validateToken);
adminRouter.post("/validate", adminFeatures.validateAdmin);
adminRouter.get("/", verifyAdmin, adminFeatures.getAllAdmins);
adminRouter.delete("/:id", verifyAdmin, adminFeatures.deleteAdmin);

module.exports = adminRouter;