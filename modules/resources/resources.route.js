const express = require('express');
const resourceRouter = express.Router();
const resourceFeatures = require("./resources.feature");

resourceRouter.post('/', resourceFeatures.createResource);
resourceRouter.get('/', resourceFeatures.getAllResources);
resourceRouter.get('/:id', resourceFeatures.getResourceById);
resourceRouter.patch('/:id', resourceFeatures.updateResource);
resourceRouter.delete('/:id', resourceFeatures.deleteResource);

module.exports = resourceRouter;
