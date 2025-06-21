const express = require('express');
const resourceRouter = express.Router();
const resourceFeatures = require("./resources.feature");
const uploader = require('../../utils/upload');

const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
];
const maxSize = 50;
const folder = "/resources";

resourceRouter.post('/', uploader(folder, allowedFileTypes, maxSize).single("coverPhoto"), resourceFeatures.createResource);
resourceRouter.get('/', resourceFeatures.getAllResources);
resourceRouter.get('/:id', resourceFeatures.getResourceById);
resourceRouter.patch('/:id', resourceFeatures.updateResource);
resourceRouter.delete('/:id', resourceFeatures.deleteResource);

module.exports = resourceRouter;
