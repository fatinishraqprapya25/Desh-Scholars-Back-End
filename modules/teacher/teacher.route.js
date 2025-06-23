const teacherRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const teacherFeatures = require("./teacher.features");
const { createTeacherSchema, updateTeacherSchema } = require("./teacher.validations");
const verifyAdmin = require("../../middlewares/VerifyAdmin");

teacherRouter.post("/", verifyAdmin, validateRequest(createTeacherSchema), teacherFeatures.createTeacher);
teacherRouter.put("/", verifyAdmin, validateRequest(updateTeacherSchema), teacherFeatures.updateTeacher);
teacherRouter.delete("/:id", verifyAdmin, validateRequest(updateTeacherSchema), teacherFeatures.deleteTeacher);
teacherRouter.get("/", verifyAdmin, teacherFeatures.getAllTeachers);
teacherRouter.get("/:id", verifyAdmin, teacherFeatures.getTeacherById);

module.exports = teacherRouter;