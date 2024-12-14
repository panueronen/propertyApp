const Maintenance = require('../models/Maintenance');
const xml2js = require('xml2js');

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

  exports.exportMaintenanceToXML = async (req, res) => {
    try {
      // Fetch maintenance requests with populated fields
      const maintenanceRequests = await Maintenance.find().populate('propertyId tenantId');
  
      // Convert requests to plain JSON for XML conversion with valid keys
      const plainRequests = maintenanceRequests.map((req) => ({
        id: req._id.toString(), // Replace _id with id
        description: req.description,
        property: {
          id: req.propertyId?._id.toString() || null,
          name: req.propertyId?.name || null,
          address: req.propertyId?.address || null,
        },
        tenant: {
          id: req.tenantId?._id.toString() || null,
          name: req.tenantId?.name || null,
          email: req.tenantId?.email || null,
        },
        priority: req.priority,
        status: req.status,
        reportedAt: req.reportedAt,
        resolvedAt: req.resolvedAt || null,
      }));
  
      // Build XML from JSON
      const builder = new xml2js.Builder();
      const xml = builder.buildObject({ maintenanceRequests: { maintenanceRequest: plainRequests } });
  
      // Set response type and send XML
      res.set('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (error) {
      console.error('Error exporting maintenance requests as XML:', error);
      res.status(500).json({ message: 'Error exporting maintenance requests', error: error.message });
    }
  };

  exports.importMaintenanceFromXML = async (req, res) => {
    console.log("importing...")
    try {
      const parser = new xml2js.Parser();
      const xml = req.body.xml;
  
      // Parse XML to JSON
      const result = await parser.parseStringPromise(xml);
  
      if (!result.maintenanceRequests || !result.maintenanceRequests.maintenanceRequest) {
        return res.status(400).json({ message: 'Invalid XML structure' });
      }
  
      // Map XML data to create maintenance task objects
      const tasks = result.maintenanceRequests.maintenanceRequest.map((task) => ({
        description: task.description[0],
        propertyId: task.propertyId[0],
        tenantId: task.tenantId[0],
        priority: task.priority[0],
        status: task.status[0],
        reportedAt: new Date(task.reportedAt[0]),
      }));
  
      // Insert tasks into the database
      await Maintenance.insertMany(tasks);
      console.log(tasks)
  
      res.status(201).json({ message: 'Maintenance tasks imported successfully' });
    } catch (error) {
      console.error('Error importing XML:', error);
      res.status(500).json({ message: 'Error importing maintenance tasks', error: error.message });
    }
  };