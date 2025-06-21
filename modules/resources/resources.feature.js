const path = require("path");
const Resource = require("./resources.model");

const resources = {};

// CREATE RESOURCE
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

        // Type-specific validation
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

        // Determine resource URL
        let resourceUrl = '';
        if (type === 'link') {
            resourceUrl = url;
        } else if (type === 'file') {
            resourceUrl = req.files.resourceFile[0].path;
        }

        // Cover photo (optional)
        let coverPhoto = '';
        if (req.files?.coverPhoto?.[0]) {
            coverPhoto = req.files.coverPhoto[0].path;
        }

        // Create and save
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

// GET ALL RESOURCES
resources.getAllResources = async (req, res) => {
    try {
        const allResources = await Resource.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: allResources,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching resources',
            error: error.message,
        });
    }
};

// GET RESOURCE BY ID
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

// UPDATE RESOURCE
resources.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, type, url } = req.body;

        const updatedFields = {
            title,
            description,
            type,
        };

        // Update URL based on type
        if (type === 'link') {
            updatedFields.url = url;
        } else if (type === 'file' && req.files?.resourceFile?.[0]) {
            updatedFields.url = req.files.resourceFile[0].path;
        }

        // Handle cover photo update if available
        if (req.files?.coverPhoto?.[0]) {
            updatedFields.coverPhoto = req.files.coverPhoto[0].path;
        }

        const updatedResource = await Resource.findByIdAndUpdate(id, updatedFields, {
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
        console.error('Error updating resource:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while updating resource',
            error: error.message,
        });
    }
};

// DELETE RESOURCE
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
