const Maintenance = require('../models/Maintenance');

// Get all maintenance requests
exports.getAllMaintenanceRequests = async (req, res) => {
    try {
        const maintenanceRequests = await Maintenance.find().populate('propertyId tenantId');
        res.json(maintenanceRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance requests', error: error.message });
    }
};

// Get a single maintenance request by ID
exports.getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id).populate('propertyId tenantId');
        if (!maintenance) return res.status(404).json({ message: 'Maintenance request not found' });
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance request', error: error.message });
    }
};

// Create a new maintenance request
exports.createMaintenanceRequest = async (req, res) => {
    try {
        const { description, propertyId, tenantId, status, priority } = req.body;
        const newRequest = new Maintenance({ description, propertyId, tenantId, status, priority });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating maintenance request', error: error.message });
    }
};

// Update a maintenance request by ID
exports.updateMaintenanceRequest = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!maintenance) return res.status(404).json({ message: 'Maintenance request not found' });
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: 'Error updating maintenance request', error: error.message });
    }
};

// Delete a maintenance request by ID
exports.deleteMaintenanceRequest = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) return res.status(404).json({ message: 'Maintenance request not found' });
        res.json({ message: 'Maintenance request deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting maintenance request', error: error.message });
    }
};
