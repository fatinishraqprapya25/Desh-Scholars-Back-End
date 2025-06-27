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
                $group: {
                    _id: "$userId",
                    totalScore: {
                        $sum: {
                            $cond: [
                                { $eq: ["$attempt", "1"] },
                                2,
                                {
                                    $cond: [
                                        { $eq: ["$attempt", "2"] },
                                        1,
                                        0
                                    ]
                                }
                            ]
                        }
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
                    totalScore: 1
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

module.exports = leaderboardFeatures;