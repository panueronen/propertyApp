const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        unitNumber: {
            type: String,
        },
        leaseStart: {
            type: Date,
        },
        leaseEnd: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Tenant', TenantSchema);
