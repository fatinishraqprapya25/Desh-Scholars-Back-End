const Broadcast = require('./broadcasts.model');
const sendResponse = require('../../utils/sendResponse');

const broadcastsFeatures = {};

broadcastsFeatures.createBroadcast = async (req, res) => {
    try {
        const { title, description, audience } = req.body;

        if (!title || !description || !audience) {
            return sendResponse(res, 400, {
                success: false,
                message: 'Title and description and audience are required.',
            });
        }

        const broadcastData = {
            title,
            description,
            for: audience
        }

        const broadcast = await Broadcast.create(broadcastData);

        return sendResponse(res, 201, {
            success: true,
            message: 'Broadcast created successfully.',
            data: broadcast,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while creating broadcast.',
            error: error.message,
        });
    }
};

broadcastsFeatures.getAllBroadcasts = async (req, res) => {
    try {
        const { broadcastFor } = req.params;

        if (broadcastFor === "all") {
            const broadcasts = await Broadcast.find();
            return sendResponse(res, 200, {
                success: true,
                data: broadcasts,
            });
        }

        const broadcasts = await Broadcast.find({
            $or: [
                { for: broadcastFor },
                { for: 'both' }
            ]
        }).sort({ createdAt: -1 });

        return sendResponse(res, 200, {
            success: true,
            data: broadcasts,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while fetching broadcasts.',
            error: error.message,
        });
    }
};


broadcastsFeatures.getBroadcastById = async (req, res) => {
    try {
        const { id } = req.params;
        const broadcast = await Broadcast.findById(id);

        if (!broadcast) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Broadcast not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            data: broadcast,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while fetching broadcast.',
            error: error.message,
        });
    }
};

broadcastsFeatures.updateBroadcast = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Broadcast.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Broadcast not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Broadcast updated successfully.',
            data: updated,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while updating broadcast.',
            error: error.message,
        });
    }
};

broadcastsFeatures.deleteBroadcast = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Broadcast.findByIdAndDelete(id);

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Broadcast not found.',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Broadcast deleted successfully.',
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while deleting broadcast.',
            error: error.message,
        });
    }
};

module.exports = broadcastsFeatures;
