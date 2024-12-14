require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const xmlparser = require('express-xml-bodyparser');
app.use(cors({
    origin: 'http://localhost:5173', 
}));

connectDB();

app.use(express.json()); // Built-in body parser for JSON
app.use(xmlparser()); // For parsing XML requests

//Routes
const propertyRoutes = require('./routes/propertyRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/tenants', tenantRoutes);

//Log error stack
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

//Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
