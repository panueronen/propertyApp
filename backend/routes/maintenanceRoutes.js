const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

router.get('/xml', maintenanceController.exportMaintenanceToXML);
router.post('/xml', maintenanceController.importMaintenanceFromXML);

router.get('/', maintenanceController.getAllMaintenanceRequests);
router.get('/:id', maintenanceController.getMaintenanceById);
router.post('/', maintenanceController.createMaintenanceRequest);
router.put('/:id', maintenanceController.updateMaintenanceRequest);
router.delete('/:id', maintenanceController.deleteMaintenanceRequest);


module.exports = router;
