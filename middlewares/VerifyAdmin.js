const jwt = require("jsonwebtoken");
const config = require("../config");
const Admin = require("../modules/admin/admin.model");
const sendResponse = require("../utils/sendResponse");

const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendResponse(res, 401, {
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, config.jwtSecret);

        const admin = await Admin.findById(decoded._id).select("-password");
        if (!admin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found",
            });
        }

        req.user = admin;
        next();
    } catch (error) {
        return sendResponse(res, 401, {
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = verifyAdmin;
