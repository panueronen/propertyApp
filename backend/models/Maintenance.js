const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant',
        },
        status: {
            type: String,
            enum: ['open', 'in-progress', 'closed'],
            default: 'open',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        reportedAt: {
            type: Date,
            default: Date.now,
        },
        resolvedAt: {
            type: Date,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
