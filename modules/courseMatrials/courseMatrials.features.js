const CourseMaterial = require('./courseMatrials.model');
const sendResponse = require('../../utils/sendResponse');

const courseMatrialFeatures = {};

courseMatrialFeatures.createMaterial = async (req, res) => {
    try {
        const { courseId, title } = req.body;

        if (!courseId || !title) {
            return sendResponse(res, 400, {
                success: false,
                message: 'courseId and title are required.',
            });
        }

        const newMaterial = await CourseMaterial.create({ courseId, title });

        return sendResponse(res, 201, {
            success: true,
            message: 'Course material created successfully.',
            data: newMaterial,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to create course material.',
            error: error.message,
        });
    }
};

// GET ALL Course Materials
courseMatrialFeatures.getAllMaterials = async (req, res) => {
    try {
        const { courseId } = req.params;
        const materials = await CourseMaterial.find({ courseId }).populate('courseId');

        return sendResponse(res, 200, {
            success: true,
            message: 'All course materials fetched successfully.',
            data: materials,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch course materials.',
            error: error.message,
        });
    }
};

courseMatrialFeatures.getMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        const material = await CourseMaterial.findById(id).populate('courseId');

        if (!material) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Course material not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Course material fetched successfully.',
            data: material,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch course material.',
            error: error.message,
        });
    }
};

courseMatrialFeatures.updateMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const updated = await CourseMaterial.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        );

        if (!updated) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Course material not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Course material updated successfully.',
            data: updated,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to update course material.',
            error: error.message,
        });
    }
};

courseMatrialFeatures.deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await CourseMaterial.findByIdAndDelete(id);

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Course material not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Course material deleted successfully.',
            data: deleted,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to delete course material.',
            error: error.message,
        });
    }
};

module.exports = courseMatrialFeatures;
