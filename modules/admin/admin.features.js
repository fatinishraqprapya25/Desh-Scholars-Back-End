const Admin = require("./admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const sendResponse = require("../../utils/sendResponse");
const Auth = require("../auth/auth.model");
const Payment = require("../payment/payment.model");
const Course = require("../courses/courses.model");


const adminFeatures = {};

adminFeatures.validateToken = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return sendResponse(res, 401, {
                success: false,
                message: "token not found!"
            });
        }
        const authorization = token.split(" ")[1];
        const decoded = jwt.verify(authorization, config.jwtSecret);

        sendResponse(res, 200, {
            success: true,
            message: "token is valid!",
            data: decoded
        });

    } catch (err) {
        sendResponse(res, 401, {
            success: false,
            message: "invalid token"
        });
    }

}

adminFeatures.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found with this email."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordValid) {
            return sendResponse(res, 401, {
                success: false,
                message: "Invalid credentials."
            });
        }

        const tokenPayload = {
            _id: existingAdmin._id,
            email: existingAdmin.email,
            name: existingAdmin.name
        };

        const token = jwt.sign(tokenPayload, config.jwtSecret, {
            expiresIn: "30d"
        });

        sendResponse(res, 200, {
            success: true,
            message: "Login successful.",
            data: {
                token,
                admin: {
                    _id: existingAdmin._id,
                    name: existingAdmin.name,
                    email: existingAdmin.email
                }
            }
        });

    } catch (error) {
        console.log(error.message);
        sendResponse(res, 500, {
            success: false,
            message: "Error occurred during login."
        });
    }
};

adminFeatures.getRecentActivities = async (req, res) => {
    try {
        const [lastAccount, lastPayment, lastCourse] = await Promise.all([
            Auth.findOne().sort({ createdAt: -1 }),
            Payment.findOne().sort({ createdAt: -1 }),
            Course.findOne().sort({ createdAt: -1 }),
        ]);

        return sendResponse(res, 200, {
            success: true,
            message: "Recent activities fetched successfully.",
            data: {
                lastAccountCreated: lastAccount,
                lastPaymentMade: lastPayment,
                lastCourseCreated: lastCourse,
            }
        });
    } catch (error) {
        console.error("Error fetching recent activities:", error);
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching recent activities.",
        });
    }
};

adminFeatures.validateAdmin = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendResponse(res, 401, {
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.jwtSecret);
        const admin = await Admin.findById(decoded._id).select("-password");
        if (!admin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found"
            });
        }

        // Respond with admin info
        sendResponse(res, 200, {
            success: true,
            message: "Token is valid",
            data: admin
        });

    } catch (error) {
        console.error("Token validation error:", error.message);
        return sendResponse(res, 401, {
            success: false,
            message: "Invalid or expired token"
        });
    }
};

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

        const hashedPassword = await bcrypt.hash(password, parseInt(config.bcryptSaltRound));

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
        });
    } catch (error) {
        console.log(error.message);
        sendResponse(res, 500, {
            success: false,
            message: "Error occurred creating admin!"
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
            message: "Error occurred deleting admin!"
        });
    }
};

adminFeatures.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, { password: 0 }); // exclude password
        sendResponse(res, 200, {
            success: true,
            message: "Admins retrieved successfully!",
            data: admins
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error occurred fetching admins!"
        });
    }
};

module.exports = adminFeatures;
