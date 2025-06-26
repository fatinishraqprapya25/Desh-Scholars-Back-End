const Mcq = require('./mcqs.model');
const sendResponse = require('../../utils/sendResponse');

const mcqFeatures = {};

mcqFeatures.createMcq = async (req, res) => {
    try {
        const {
            question,
            options,
            correctAnswers,
            type,
            testId,
            topic,
            subject,
            chapter,
            explanation,
            difficulty,
            tags,
            scoreBond
        } = req.body;

        // Basic validations
        if (
            !question ||
            !Array.isArray(options) || options.length < 2 ||
            !Array.isArray(correctAnswers) || correctAnswers.length < 1 ||
            !type ||
            !testId ||
            !topic ||
            !subject ||
            !difficulty ||
            !Array.isArray(tags) || tags.length !== 1
        ) {
            return sendResponse(res, 400, {
                success: false,
                message:
                    "Required fields: question, options (min 2), correctAnswers (min 1), type, testId, topic, subject, difficulty, tags (single)."
            });
        }

        // Create new MCQ document
        const newMcq = new Mcq({
            question,
            options,
            correctAnswers,
            type,
            testId,
            topic,
            subject,
            chapter: chapter || '',
            explanation: explanation || '',
            difficulty,
            tags,
            scoreBond: scoreBond || '1'
        });

        await newMcq.save();

        return sendResponse(res, 201, {
            success: true,
            message: "MCQ created successfully.",
            data: newMcq,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while creating MCQ.",
        });
    }
};


mcqFeatures.findMcqs = async (req, res) => {
    try {
        const { subject, chapter, topic } = req.query;

        if (!subject && !chapter && !topic) {
            return sendResponse(res, 400, {
                success: false,
                message: "At least one query parameter is required: subject, chapter, or topic.",
            });
        }

        const query = {};
        if (subject) query.subject = subject;
        if (chapter) query.chapter = chapter;
        if (topic) query.topic = topic;

        const mcqs = await Mcq.find(query);

        if (mcqs.length === 0) {
            return sendResponse(res, 404, {
                success: false,
                message: "No MCQs found matching the provided query.",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "MCQs fetched successfully.",
            data: mcqs,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching MCQs.",
        });
    }
};


mcqFeatures.getAggrigiatedMcqs = async (req, res) => {
    const filters = req.body;
    try {
        const matchStage = {};

        if (filters.activeQuestions) {
            const normalizedActiveQuestions = filters.activeQuestions.toLowerCase();
            matchStage.tags = normalizedActiveQuestions;
        }

        if (filters.difficulty) {
            const normalizedDifficulty = filters.difficulty.toLowerCase();
            matchStage.difficulty = normalizedDifficulty;
        }

        if (filters.scoreBand) {
            matchStage.scoreBand = filters.scoreBand;
        }

        const aggregation = await Mcq.aggregate([
            {
                $match: matchStage,
            },
            {
                $facet: {
                    bySubject: [
                        {
                            $group: {
                                _id: "$subject",
                                count: { $sum: 1 },
                                questions: { $push: "$$ROOT" },
                            },
                        },
                    ],
                    byChapter: [
                        {
                            $group: {
                                _id: "$chapter",
                                count: { $sum: 1 },
                                questions: { $push: "$$ROOT" },
                            },
                        },
                    ],
                    byTopic: [
                        {
                            $group: {
                                _id: "$topic",
                                count: { $sum: 1 },
                                questions: { $push: "$$ROOT" },
                            },
                        },
                    ],
                },
            },
        ]);

        sendResponse(res, 200, {
            success: true,
            message: "Aggregated MCQs fetched successfully",
            data: aggregation[0],
        });
    } catch (error) {
        console.error("Aggregation error:", error.message);
        sendResponse(res, 500, {
            success: false,
            message: "Server error while aggregating MCQs",
        });
    }
};

mcqFeatures.getMcqCountByTestId = async (req, res) => {
    try {
        const { testId } = req.params;
        if (!testId) {
            return sendResponse(res, 400, {
                success: false,
                message: "testId parameter is required."
            });
        }

        const mcqCount = await Mcq.countDocuments({ testId });

        sendResponse(res, 200, {
            success: true,
            message: "MCQ count fetched successfully.",
            data: mcqCount
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching MCQ count."
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
    console.log(req.body);
    try {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(updatedData);
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
