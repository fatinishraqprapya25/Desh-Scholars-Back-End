const Teacher = require("./teacher.model");
const bcrypt = require("bcrypt");
const config = require("../../config");
const sendResponse = require("../../utils/sendResponse");

const teacherFeatures = {};

teacherFeatures.createTeacher = async (req, res) => {
    try {
        const { name, email, password, phone, gender, bio } = req.body;

        const existing = await Teacher.findOne({ email });
        if (existing) {
            return sendResponse(res, 400, {
                success: false,
                message: "Teacher with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(config.bcryptSaltRound));

        const teacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            bio,
        });

        await teacher.save();

        sendResponse(res, 201, {
            success: true,
            message: "Teacher created successfully",
            data: {
                teacherId: teacher._id,
            },
        });
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, {
            success: false,
            message: "Failed to create teacher",
        });
    }
};

teacherFeatures.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ isDeleted: false }).select("-password");
        sendResponse(res, 200, {
            success: true,
            message: "Teachers retrieved successfully",
            data: teachers,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch teachers",
        });
    }
};

teacherFeatures.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, parseInt(config.bcryptSaltRound));
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!updatedTeacher) {
            return sendResponse(res, 404, {
                success: false,
                message: "Teacher not found",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Teacher updated successfully",
            data: updatedTeacher,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to update teacher",
        });
    }
};

teacherFeatures.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Teacher.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: "Teacher not found",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Teacher deleted successfully",
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to delete teacher",
        });
    }
};

module.exports = teacherFeatures;
