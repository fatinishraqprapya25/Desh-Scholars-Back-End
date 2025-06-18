const adminRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const { default: adminFeatures } = require("./admin.features");
const { default: adminValidations } = require("./admin.validations");

adminRouter.post("/", validateRequest(adminValidations.createAdminSchema), adminFeatures.createAdmin);
adminRouter.delete("/:id", adminFeatures.deleteAdmin);