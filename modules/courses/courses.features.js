const Course = require("./courses.model");
const sendResponse = require("../../utils/sendResponse");
const path = require("path");

const courseFeatures = {};

courseFeatures.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseType,
            courseStatus,
            isPaid,
            price,
            courseDescription,
            instructorId,
            level,
            startTime
        } = req.body;

        if (courseType === "live" && !startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses."
            });
        }

        // Handle uploaded file
        let courseImagePath = null;
        if (req.file) {
            courseImagePath = path.join(process.cwd(), req.file.path);
        }

        const newCourse = new Course({
            courseName,
            courseType,
            courseStatus,
            isPaid,
            description: courseDescription,
            startTime: courseType === "live" ? startTime : null,
            courseImage: courseImagePath,
            price,
            instructorId,
            level
        });

        await newCourse.save();

        sendResponse(res, 201, {
            success: true,
            message: "Course created successfully.",
            data: newCourse
        });
    } catch (err) {
        console.error(err.message);
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating course."
        });
    }
};

courseFeatures.getAllCourses = async (req, res) => {
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

courseFeatures.getCourseById = async (req, res) => {
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

courseFeatures.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (req.file) {
            const filePath = path.join(process.cwd(), req.file.path);
            updatedData.courseImage = filePath;
        }
        if (updatedData.courseType === "live" && !updatedData.startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses"
            });
        }
        if (updatedData.courseType === "recorded") delete updatedData.startTime;
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
            message: err.message
        });
    }
};

courseFeatures.deleteCourse = async (req, res) => {
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

module.exports = courseFeatures;
