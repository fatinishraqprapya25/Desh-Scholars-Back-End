const MockQuestion = require('./mockQuestions.model');
const sendResponse = require('../../utils/sendResponse');

const mockQuestionFeatures = {};

mockQuestionFeatures.createMockQuestion = async (req, res) => {
    try {
        const mockQuestion = new MockQuestion(req.body);
        await mockQuestion.save();
        sendResponse(res, 201, {
            success: true,
            message: "Mock question created successfully.",
            data: mockQuestion,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error creating mock question.",
            error: error.message,
        });
    }
};

mockQuestionFeatures.getAllMockQuestions = async (req, res) => {
    try {
        const mockQuestions = await MockQuestion.find();
        sendResponse(res, 200, {
            success: true,
            message: "Mock questions fetched successfully.",
            data: mockQuestions,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error fetching mock questions.",
            error: error.message,
        });
    }
};

mockQuestionFeatures.getMockQuestionById = async (req, res) => {
    try {
        const { mockId } = req.params;
        const mockQuestion = await MockQuestion.findOne({ mockId });

        if (!mockQuestion) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock question not found.",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Mock question fetched successfully.",
            data: mockQuestion,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error fetching mock question.",
            error: error.message,
        });
    }
};

mockQuestionFeatures.updateMockQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMockQuestion = await MockQuestion.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMockQuestion) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock question not found.",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Mock question updated successfully.",
            data: updatedMockQuestion,
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error updating mock question.",
            error: error.message,
        });
    }
};

mockQuestionFeatures.deleteMockQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMockQuestion = await MockQuestion.findByIdAndDelete(id);

        if (!deletedMockQuestion) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock question not found.",
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Mock question deleted successfully.",
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting mock question.",
            error: error.message,
        });
    }
};

module.exports = mockQuestionFeatures;
