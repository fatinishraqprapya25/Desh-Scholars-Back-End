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
        for: {
            type: String,
            required: true,
            enum: ['both', 'students', 'teachers'],
            default: 'both',
        },
    },
    {
        timestamps: true,
    }
);

const Broadcast = mongoose.model('Broadcast', broadcastSchema);

module.exports = Broadcast;