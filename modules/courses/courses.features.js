const Course = require("./courses.model");
const sendResponse = require("../../utils/sendResponse");

const courseService = {};

courseService.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseType,
            courseStatus,
            isPaid,
            description,
            instructorName,
            courseImage,
            startTime
        } = req.body;

        if (courseType === "live" && !startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses."
            });
        }

        const course = new Course({
            courseName,
            courseType,
            courseStatus,
            isPaid,
            description,
            instructorName,
            courseImage,
            startTime: courseType === "live" ? startTime : null
        });

        await course.save();

        sendResponse(res, 201, {
            success: true,
            message: "Course created successfully.",
            data: course
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating course."
        });
    }
};

courseService.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isDeleted: false });
        sendResponse(res, 200, {
            success: true,
            message: "Courses fetched successfully.",
            data: courses
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching courses."
        });
    }
};

courseService.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, isDeleted: false });

        if (!course) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course found",
            data: course
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error getting course"
        });
    }
};

courseService.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (updatedData.courseType === "live" && !updatedData.startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses"
            });
        }

        const updated = await Course.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!updated) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course updated successfully",
            data: updated
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error updating course"
        });
    }
};

courseService.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Course.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found or already deleted"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course soft deleted successfully"
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting course"
        });
    }
};

module.exports = courseService;
