const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// CRUD Endpoints for Properties
router.get('/', propertyController.getAllProperties); // Get all properties
router.get('/:id', propertyController.getPropertyById); // Get a single property by ID
router.post('/', propertyController.createProperty); // Create a new property
router.put('/:id', propertyController.updateProperty); // Update a property by ID
router.delete('/:id', propertyController.deleteProperty); // Delete a property by ID

module.exports = router;
