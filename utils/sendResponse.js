const sendResponse = (res, statusCode, object) => {
    res.status(statusCode).json(object);
}

module.exports = sendResponse;