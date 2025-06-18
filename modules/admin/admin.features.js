const Admin = require("./admin.model");
const bcrypt = require("bcrypt");
const config = require("../../config");
const sendResponse = require("../../utils/sendResponse");

adminFeatures.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return sendResponse(res, 400, {
                success: false,
                message: "admin with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRound);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        sendResponse(res, 200, {
            success: true,
            message: 'Admin created successfully',
            data: {
                adminId: newAdmin._id
            }
        })
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error occured creating admin!"
        });
    }
};

adminFeatures.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found!"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Admin deleted successfully!"
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error occured deleting admin!"
        });
    }
};

export default adminFeatures;
