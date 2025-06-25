const teacherRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const teacherFeatures = require("./teacher.features");
const { createTeacherSchema, updateTeacherSchema } = require("./teacher.validations");
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const uploader = require("../../utils/upload");

teacherRouter.post("/", verifyAdmin, validateRequest(createTeacherSchema), teacherFeatures.createTeacher);
teacherRouter.put("/:id", uploader("teachers", ["image/jpeg", "image/png", "image/jpg"], 20).single("profile"), validateRequest(updateTeacherSchema), teacherFeatures.updateTeacher);
teacherRouter.delete("/:id", verifyAdmin, validateRequest(updateTeacherSchema), teacherFeatures.deleteTeacher);
teacherRouter.get("/", teacherFeatures.getAllTeachers);
teacherRouter.get("/:id", teacherFeatures.getTeacherById);

teacherRouter.post("/login", teacherFeatures.login);
teacherRouter.get("/validate/token", teacherFeatures.validateTeacher);

module.exports = teacherRouter;