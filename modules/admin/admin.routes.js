const adminRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const adminFeatures = require("./admin.features");
const { default: adminValidations } = require("./admin.validations");

adminRouter.post("/", validateRequest(adminValidations.createAdminSchema), adminFeatures.createAdmin);
adminRouter.post("/login", validateRequest(adminValidations.loginAdminSchema), adminFeatures.loginAdmin);
adminRouter.get("/", adminFeatures.getAllAdmins);
adminRouter.delete("/:id", adminFeatures.deleteAdmin);

module.exports = adminRouter;