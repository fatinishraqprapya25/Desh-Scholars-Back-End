const { ZodError } = require("zod");
const sendResponse = require("../utils/sendResponse");
const { MulterError } = require("multer");

const globalErrorHandler = (error, req, res, next) => {
    let errors = {};
    if (error instanceof ZodError) {
        const formattedError = [];
        error.errors.map(err => {
            formattedError[formattedError.length] = { path: err.path.join("."), message: err.message };
        })
        errors = formattedError;
    }

    sendResponse(res, 500, {
        success: false,
        message: error.message,
        error: errors
    });
}

module.exports = globalErrorHandler;