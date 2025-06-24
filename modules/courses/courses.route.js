const courseRouter = require("express").Router();
const verifyAdmin = require("../../middlewares/VerifyAdmin");
const courseFeatures = require("./courses.features");
const uploader = require("../../utils/upload");

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 30;

courseRouter.post("/", verifyAdmin, uploader("courses", allowedFileTypes, maxSize).single("courseImage"), courseFeatures.createCourse);

courseRouter.get("/", courseFeatures.getAllCourses);
courseRouter.get("/:id", courseFeatures.getCourseById);
courseRouter.get("/c/two", courseFeatures.get2Courses);
courseRouter.delete("/:id", verifyAdmin, courseFeatures.deleteCourse);
courseRouter.put("/:id", verifyAdmin, uploader("courses", allowedFileTypes, 20).single("courseImage"), courseFeatures.updateCourse);

module.exports = courseRouter;