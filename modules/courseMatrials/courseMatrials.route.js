const courseMatrialFeatures = require("./courseMatrials.features");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const courseMatrialRouter = require("express").Router();

courseMatrialRouter.get("/", courseMatrialFeatures.getAllMaterials);
courseMatrialRouter.get("/:id", courseMatrialFeatures.getMaterialById);
courseMatrialFeatures.post("/", verifyAdmin, courseMatrialFeatures.createMaterial);
courseMatrialFeatures.put("/:id", verifyAdmin, courseMatrialFeatures.updateMaterial);
courseMatrialFeatures.deleteMaterial("/:id", verifyAdmin, courseMatrialFeatures.deleteMaterial);

module.exports = courseMatrialRouter;