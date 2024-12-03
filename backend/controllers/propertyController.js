const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property', error: error.message });
    }
};

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { name, address, owner, contactInfo, status } = req.body;
        const newProperty = new Property({ name, address, owner, contactInfo, status });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error creating property', error: error.message });
    }
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
};
