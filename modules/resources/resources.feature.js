const Resource = require('./resources.model');
const path = require("path");

const resources = {};

// Create Resource
resources.createResource = async (req, res) => {
    try {
        const { type, url, description, title } = req.body;
        // Validate required fields
        if (!type || !description || !title) {
            return res.status(400).json({
                success: false,
                message: "Type, title, and description are required.",
            });
        }

        // Validate based on type
        if (type === 'link' && !url) {
            return res.status(400).json({
                success: false,
                message: "URL is required for link type resources.",
            });
        }

        if (type === 'file' && (!req.files || !req.files.resourceFile)) {
            return res.status(400).json({
                success: false,
                message: "Resource file is required for file type resources.",
            });
        }

        // Process resource file or link
        let resourceUrl = '';
        if (type === 'link') {
            resourceUrl = url;
        } else if (type === 'file') {
            resourceUrl = req.files.resourceFile[0].path;
        }

        // Process cover photo if available
        let coverPhoto = '';
        if (req.files && req.files.coverPhoto) {
            coverPhoto = req.files.coverPhoto[0].path;
        }

        // Create the resource
        const resource = await Resource.create({
            type,
            url: resourceUrl,
            coverPhoto,
            title,
            description,
        });

        return res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            data: resource,
        });
    } catch (error) {
        console.error('Error creating resource:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating resource',
            error: error.message,
        });
    }
};

// Get all resources
resources.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: resources,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching resources',
            error: error.message,
        });
    }
};

// Get a single resource by ID
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

        return res.status(200).json({
            success: true,
            data: resource,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching resource',
            error: error.message,
        });
    }
};

// Update a resource
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

        return res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            data: updatedResource,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while updating resource',
            error: error.message,
        });
    }
};

// Delete a resource
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

        return res.status(200).json({
            success: true,
            message: 'Resource deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting resource',
            error: error.message,
        });
    }
};

module.exports = resources;
