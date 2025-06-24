const sendResponse = require("../../utils/sendResponse");
const User = require("./auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/")

const authFeatures = {};

authFeatures.register = async (req, res) => {
    try {
        const userInfo = req.body;

        // Hash password before saving
        userInfo.password = await bcrypt.hash(userInfo.password, 10);

        const result = await User.create(userInfo);
        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "Failed to register user"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "User registration successful!",
            data: {
                _id: result._id,
                name: result.name,
                email: result.email
            }
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
};

authFeatures.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 404, {
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 401, {
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            config.jwtSecret,
            { expiresIn: "30d" }
        );

        sendResponse(res, 200, {
            success: true,
            message: "Login successful!",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
};

authFeatures.validateToken = async (req, res) => {
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

module.exports = authFeatures;
