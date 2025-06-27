const TestHistory = require("./testHistory.model");
const sendResponse = require("../../utils/sendResponse");

const testHistoryController = {};

testHistoryController.create = async (req, res) => {
    try {
        const { questionId, status } = req.body;

        const history = new TestHistory({ questionId, status, attempt });
        await history.save();

        sendResponse(res, 201, {
            success: true,
            message: "Test history created successfully",
            data: history,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to create test history",
        });
    }
};

testHistoryController.getAllByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const histories = await TestHistory.find({ userId });
        sendResponse(res, 200, {
            success: true,
            message: "Test history fetched successfully",
            data: histories,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch test history",
        });
    }
};

// Get test history by ID
testHistoryController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await TestHistory.findById(id);

        if (!history) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test history not found",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test history retrieved successfully",
            data: history,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch test history",
        });
    }
};

// Update test history by ID
testHistoryController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updated = await TestHistory.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test history not found",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test history updated successfully",
            data: updated,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to update test history",
        });
    }
};

// Delete test history by ID
testHistoryController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await TestHistory.findByIdAndDelete(id);

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: "Test history not found",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Test history deleted successfully",
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to delete test history",
        });
    }
};

module.exports = testHistoryController;
