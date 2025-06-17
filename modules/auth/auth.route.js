const validateRequest = require("../../middlewares/validateRequest");
const deleteFile = require("../../utils/deleteFile");
const uploader = require("../../utils/upload");
const authFeatures = require("./auth.features");
const authValidations = require("./auth.validations");
const authRouter = require("express").Router();

const uploadFolderName = "avatars";
const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const maxFileSize = 5;

authRouter.post("/", uploader(uploadFolderName, allowedFileTypes, maxFileSize).single("avatar"), validateRequest(authValidations.registerValidation, function (filePath) {
    deleteFile(filePath);
}), authFeatures.register);


module.exports = authRouter;