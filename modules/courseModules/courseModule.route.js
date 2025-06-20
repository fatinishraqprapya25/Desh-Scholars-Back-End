const courseModuleFeatures = require("./courseModule.features");

const moduleRouter = require("express").Router();

moduleRouter.post("/", courseModuleFeatures.createModule);
moduleRouter.get("/:courseId", courseModuleFeatures.getModulesByCourseId);
moduleRouter.put("/:id", courseModuleFeatures.updateModule);
moduleRouter.delete("/:id", courseModuleFeatures.deleteModule);


module.exports = moduleRouter;