const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// CRUD Endpoints for Tenants
router.get('/', tenantController.getAllTenants); // Get all tenants
router.get('/:id', tenantController.getTenantById); // Get a single tenant by ID
router.post('/', tenantController.createTenant); // Create a new tenant
router.put('/:id', tenantController.updateTenant); // Update a tenant by ID
router.delete('/:id', tenantController.deleteTenant); // Delete a tenant by ID

module.exports = router;
