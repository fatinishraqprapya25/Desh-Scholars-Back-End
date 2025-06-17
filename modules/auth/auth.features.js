const sendResponse = require("../../utils/sendResponse");
const User = require("./auth.model");

const authFeatures = {};

authFeatures.register = async (req, res) => {
    try {
        const userInfo = req.body;
        const result = await User.create(userInfo);
        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "failed to register user"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "user registration successfull!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

module.exports = authFeatures;