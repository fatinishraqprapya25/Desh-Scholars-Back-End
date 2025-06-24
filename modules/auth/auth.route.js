const validateRequest = require("../../middlewares/validateRequest");
const authFeatures = require("./auth.features");
const authValidations = require("./auth.validations");
const authRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");

authRouter.post("/register", validateRequest(authValidations.registerValidation), authFeatures.register);
authRouter.post("/login", validateRequest(authValidations.loginValidation), authFeatures.login);
authRouter.get("/validate-token", authFeatures.validateToken);
authRouter.get("/", authFeatures.getAllUsers);

module.exports = authRouter;