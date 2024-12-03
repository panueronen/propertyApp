const Tenant = require('../models/Tenant');

// Get all tenants
exports.getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find().populate('propertyId');
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenants', error: error.message });
    }
};

// Get a single tenant by ID
exports.getTenantById = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id).populate('propertyId');
        if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenant', error: error.message });
    }
};

// Create a new tenant
exports.createTenant = async (req, res) => {
    try {
        const { name, email, phone, propertyId, unitNumber, leaseStart, leaseEnd } = req.body;
        const newTenant = new Tenant({ name, email, phone, propertyId, unitNumber, leaseStart, leaseEnd });
        await newTenant.save();
        res.status(201).json(newTenant);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tenant', error: error.message });
    }
};

// Update a tenant by ID
exports.updateTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Error updating tenant', error: error.message });
    }
};

// Delete a tenant by ID
exports.deleteTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
        res.json({ message: 'Tenant deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tenant', error: error.message });
    }
};
