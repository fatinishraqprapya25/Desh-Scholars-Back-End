const TestHistory = require("./testHistory.model");
const sendResponse = require("../../utils/sendResponse");

const testHistoryController = {};


testHistoryController.create = async (req, res) => {
    try {
        const { questionId, status, userId, time } = req.body;

        const existing = await TestHistory.findOne({ questionId, userId });

        if (existing) {
            if (existing.status === status || existing.status === "Correct") {
                return sendResponse(res, 200, {
                    success: true,
                    message: "No update needed. Status is already the same.",
                    data: existing,
                });
            }

            existing.status = status;
            existing.attempt = "2";
            await existing.save();

            return sendResponse(res, 200, {
                success: true,
                message: "Test history updated successfully",
                data: existing,
            });
        }

        const newHistory = new TestHistory({ questionId, status, userId, time });
        await newHistory.save();

        return sendResponse(res, 201, {
            success: true,
            message: "Test history created successfully",
            data: newHistory,
        });
    } catch (error) {
        console.error("Error creating/updating test history:", error);
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while creating/updating test history",
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
