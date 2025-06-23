const Mcq = require('./mcqs.model');
const sendResponse = require('../../utils/sendResponse');

const mcqFeatures = {};

mcqFeatures.createMcq = async (req, res) => {
    try {
        const { question, options, correctAnswers, type, testId } = req.body;

        if (!question || !Array.isArray(options) || options.length < 2 || !Array.isArray(correctAnswers) || correctAnswers.length < 1 || !type || !testId) {
            return sendResponse(res, 400, {
                success: false,
                message: "Required fields: question, options (min 2), correctAnswers (min 1), type, testId."
            });
        }

        const newMcq = new Mcq({ question, options, correctAnswers, type, testId });
        await newMcq.save();

        sendResponse(res, 201, {
            success: true,
            message: "MCQ created successfully.",
            data: newMcq
        });
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating MCQ."
        });
    }
};

mcqFeatures.getMcqsByTestId = async (req, res) => {
    try {
        const { testId } = req.params;
        if (!testId) {
            return sendResponse(res, 400, {
                success: false,
                message: "testId parameter is required."
            });
        }

        const mcqs = await Mcq.find({ testId }).sort({ createdAt: -1 });

        sendResponse(res, 200, {
            success: true,
            message: "MCQs fetched successfully.",
            data: mcqs
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching MCQs."
        });
    }
};

mcqFeatures.updateMcq = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(updatedData);
        const updatedMcq = await Mcq.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedMcq) {
            return sendResponse(res, 404, {
                success: false,
                message: "MCQ not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "MCQ updated successfully.",
            data: updatedMcq
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while updating MCQ."
        });
    }
};

mcqFeatures.deleteMcq = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMcq = await Mcq.findByIdAndDelete(id);

        if (!deletedMcq) {
            return sendResponse(res, 404, {
                success: false,
                message: "MCQ not found."
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "MCQ deleted successfully."
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while deleting MCQ."
        });
    }
};

module.exports = mcqFeatures;
