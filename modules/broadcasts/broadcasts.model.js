const mongoose = require('mongoose');

const broadcastSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Broadcast = mongoose.model('Broadcast', broadcastSchema);

module.exports = Broadcast;
