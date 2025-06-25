const CourseModule = require('./courseModule.model');
const sendResponse = require('../../utils/sendResponse');

const courseModuleFeatures = {};

courseModuleFeatures.createModule = async (req, res) => {
    try {
        const { courseId, moduleName, videoLink } = req.body;

        if (!courseId || !moduleName || !videoLink) {
            return sendResponse(res, 400, {
                success: false,
                message: "courseId, moduleName and videoLink are required."
            });
        }

        const newModule = new CourseModule({
            courseId,
            moduleName,
            videoLink
        });

        await newModule.save();

        sendResponse(res, 201, {
            success: true,
            message: "Course module created successfully.",
            data: newModule
        });
    } catch (err) {
        console.error(err.message);
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating course module."
        });
    }
};

courseModuleFeatures.getModulesByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return sendResponse(res, 400, {
                success: false,
                message: "courseId parameter is required."
            });
        }

        const modules = await CourseModule.find({ courseId }).sort({ createdAt: 1 });

        console.log(modules);

        sendResponse(res, 200, {
            success: true,
            message: "Modules fetched successfully.",
            data: modules
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching modules."
        });
    }
};

courseModuleFeatures.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedModule = await CourseModule.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedModule) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course module not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course module updated successfully.",
            data: updatedModule
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error updating course module."
        });
    }
};

courseModuleFeatures.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedModule = await CourseModule.findByIdAndDelete(id);

        if (!deletedModule) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course module not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course module deleted successfully."
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting course module."
        });
    }
};

module.exports = courseModuleFeatures;
