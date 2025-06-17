const validateRequest = require("../../middlewares/validateRequest");
const authFeatures = require("./auth.features");
const authValidations = require("./auth.validations");
const authRouter = require("express").Router();

authRouter.post("/register", validateRequest(authValidations.registerValidation), authFeatures.register);
authRouter.post("/login", validateRequest(authValidations.loginValidation), authFeatures.login);

module.exports = authRouter;