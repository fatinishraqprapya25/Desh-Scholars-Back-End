const Resource = require('../models/resource.model');

const resources = {};

resources.createResource = async (req, res) => {
    try {
        const { type, url, coverPhoto, description } = req.body;

        if (!type || !url) {
            return res.status(400).json({
                success: false,
                message: "Type and URL are required",
            });
        }

        const resource = await Resource.create({
            type,
            url,
            coverPhoto,
            description,
        });

        res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            data: resource,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while creating resource',
            error: error.message,
        });
    }
};

resources.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: resources,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resources',
            error: error.message,
        });
    }
};

resources.getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
            });
        }

        res.status(200).json({
            success: true,
            data: resource,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resource',
            error: error.message,
        });
    }
};

resources.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedResource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            data: updatedResource,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating resource',
            error: error.message,
        });
    }
};

resources.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Resource.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Resource deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting resource',
            error: error.message,
        });
    }
};

module.exports = resources;