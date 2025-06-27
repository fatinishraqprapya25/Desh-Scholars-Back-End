const TestHistory = require("../testHistory/testHistory.model");
const sendResponse = require("../../utils/sendResponse");

const leaderboardFeatures = {};

leaderboardFeatures.getTestsLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await TestHistory.aggregate([
            {
                $match: { status: "Correct" }
            },
            {
                $addFields: {
                    attemptNum: { $toInt: "$attempt" },
                    timeNum: { $toDouble: "$time" }
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalScore: {
                        $sum: {
                            $cond: [
                                { $eq: ["$attemptNum", 1] },
                                2,
                                {
                                    $cond: [
                                        { $eq: ["$attemptNum", 2] },
                                        1,
                                        0
                                    ]
                                }
                            ]
                        }
                    },
                    totalTime: { $sum: "$timeNum" },
                    totalQuestions: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    averageTime: {
                        $cond: [
                            { $eq: ["$totalQuestions", 0] },
                            0,
                            { $divide: ["$totalTime", "$totalQuestions"] }
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    name: "$user.name",
                    email: "$user.email",
                    totalScore: 1,
                    averageTime: { $round: ["$averageTime", 2] } // Rounded to 2 decimal places
                }
            },
            {
                $sort: { totalScore: -1 }
            }
        ]);

        sendResponse(res, 200, {
            success: true,
            message: "Tests leaderboard fetched successfully",
            data: leaderboard
        });
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch tests leaderboard"
        });
    }
};

leaderboardFeatures.getUserRank = async (req, res) => {
    try {
        const userId = req.params.userId;

        const leaderboard = await TestHistory.aggregate([
            {
                $match: { status: "Correct" }
            },
            {
                $addFields: {
                    attemptNum: { $toInt: "$attempt" },
                    timeNum: { $toDouble: "$time" }
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalScore: {
                        $sum: {
                            $cond: [
                                { $eq: ["$attemptNum", 1] },
                                2,
                                {
                                    $cond: [
                                        { $eq: ["$attemptNum", 2] },
                                        1,
                                        0
                                    ]
                                }
                            ]
                        }
                    },
                    totalTime: { $sum: "$timeNum" },
                    totalQuestions: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    averageTime: {
                        $cond: [
                            { $eq: ["$totalQuestions", 0] },
                            0,
                            { $divide: ["$totalTime", "$totalQuestions"] }
                        ]
                    }
                }
            },
            {
                $sort: { totalScore: -1 }
            }
        ]);

        const userRankIndex = leaderboard.findIndex(entry => entry._id.toString() === userId);

        if (userRankIndex === -1) {
            return sendResponse(res, 404, {
                success: false,
                message: "User not found in leaderboard"
            });
        }

        const user = leaderboard[userRankIndex];

        sendResponse(res, 200, {
            success: true,
            message: "User rank fetched successfully",
            data: {
                userId,
                rank: userRankIndex + 1,
                totalScore: user.totalScore,
                averageTime: Math.round(user.averageTime * 100) / 100 // rounded to 2 decimal places
            }
        });
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch user rank"
        });
    }
};

leaderboardFeatures.getLeaderboardSummary = async (req, res) => {
    try {
        const summary = await TestHistory.aggregate([
            {
                $match: { status: "Correct" }
            },
            {
                $addFields: {
                    attemptNum: { $toInt: "$attempt" },
                    timeNum: { $toDouble: "$time" },
                    isFirstAttempt: { $cond: [{ $eq: ["$attempt", "1"] }, 1, 0] }
                }
            },
            {
                $group: {
                    _id: "$userId",
                    solvedCount: { $sum: 1 },
                    totalTime: { $sum: "$timeNum" },
                    firstAttemptCount: { $sum: "$isFirstAttempt" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalStudents: { $sum: 1 },
                    totalSolved: { $sum: "$solvedCount" },
                    totalTime: { $sum: "$totalTime" },
                    totalFirstAttempts: { $sum: "$firstAttemptCount" }
                }
            },
            {
                $addFields: {
                    avgSolved: { $divide: ["$totalSolved", "$totalStudents"] },
                    avgTime: { $cond: [{ $eq: ["$totalSolved", 0] }, 0, { $divide: ["$totalTime", "$totalSolved"] }] },
                    avgSuccessRate: {
                        $cond: [
                            { $eq: ["$totalSolved", 0] },
                            0,
                            { $multiply: [{ $divide: ["$totalFirstAttempts", "$totalSolved"] }, 100] }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalStudents: 1,
                    avgSolved: { $round: ["$avgSolved", 1] },
                    avgTime: { $round: ["$avgTime", 1] },
                    avgSuccessRate: { $round: ["$avgSuccessRate", 1] }
                }
            }
        ]);

        sendResponse(res, 200, {
            success: true,
            message: "Leaderboard summary fetched successfully",
            data: summary[0] || {
                totalStudents: 0,
                avgSolved: 0,
                avgTime: 0,
                avgSuccessRate: 0
            }
        });
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch leaderboard summary"
        });
    }
};

module.exports = leaderboardFeatures;