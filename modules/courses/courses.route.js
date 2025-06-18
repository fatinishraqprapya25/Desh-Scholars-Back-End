const courseRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const courseFeatures = require("./courses.features");
const uploader = require("../../utils/upload");

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 30;

courseRouter.post("/", verifyAdmin, uploader("courses", allowedFileTypes, maxSize).single("courseImage"), courseFeatures.createCourse);

courseRouter.get("/", courseFeatures.getAllCourses);
courseRouter.delete("/:id", courseFeatures.deleteCourse);

module.exports = courseRouter;