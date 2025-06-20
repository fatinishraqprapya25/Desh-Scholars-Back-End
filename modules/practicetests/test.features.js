const Test = require('./test.model');
const sendResponse = require('../../utils/sendResponse');

const testFeatures = {};

testFeatures.createTest = async (req, res) => {
    try {
        const testDetails = req.body;

        const newTest = new Test(testDetails);

        await newTest.save();

        sendResponse(res, 201, {
            success: true,
            message: "Test created successfully.",
            data: newTest
        });
    } catch (err) {
        console.error(err.message);
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating test."
        });
    }
};

testFeatures.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find().sort({ createdAt: -1 });

        sendResponse(res, 200, {
            success: true,
            message: "Tests fetched successfully.",
            data: tests
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching tests."
        });
    }
};

testFeatures.getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);

        if (!test) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test fetched successfully.",
            data: test
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error fetching test."
        });
    }
};

testFeatures.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedTest = await Test.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTest) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test updated successfully.",
            data: updatedTest
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error updating test."
        });
    }
};

testFeatures.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTest = await Test.findByIdAndDelete(id);

        if (!deletedTest) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test deleted successfully."
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting test."
        });
    }
};

module.exports = testFeatures;