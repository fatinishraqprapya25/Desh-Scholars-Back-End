const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['video', 'pdf', 'link', 'image', 'audio'],
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        coverPhoto: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
