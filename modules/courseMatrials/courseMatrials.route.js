const courseMatrialFeatures = require("./courseMatrials.features");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const courseMatrialRouter = require("express").Router();

courseMatrialRouter.get("/:courseId", courseMatrialFeatures.getAllMaterials);
courseMatrialRouter.get("/:id", courseMatrialFeatures.getMaterialById);
courseMatrialRouter.post("/", verifyAdmin, courseMatrialFeatures.createMaterial);
courseMatrialRouter.put("/:id", verifyAdmin, courseMatrialFeatures.updateMaterial);
courseMatrialRouter.delete("/:id", verifyAdmin, courseMatrialFeatures.deleteMaterial);

module.exports = courseMatrialRouter;