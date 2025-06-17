const sendResponse = require("../utils/sendResponse");

const notFoundHandler = (req, res) => {
    sendResponse(res, 404, {
        success: false,
        message: "page not found!",
    });
}

module.exports = notFoundHandler;