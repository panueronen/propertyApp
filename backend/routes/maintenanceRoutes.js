const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// CRUD Endpoints for Maintenance
router.get('/', maintenanceController.getAllMaintenanceRequests); // Get all maintenance requests
router.get('/:id', maintenanceController.getMaintenanceById); // Get a single maintenance request by ID
router.post('/', maintenanceController.createMaintenanceRequest); // Create a new maintenance request
router.put('/:id', maintenanceController.updateMaintenanceRequest); // Update a maintenance request by ID
router.delete('/:id', maintenanceController.deleteMaintenanceRequest); // Delete a maintenance request by ID

module.exports = router;
