require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());

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
