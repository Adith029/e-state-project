const mongoose = require('mongoose');

const doneDealSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties',
        required: true
    },
    details: {
        type: Object,
        required: true
    }
});

const DoneDeal = mongoose.model('doneDeals', doneDealSchema);
module.exports = DoneDeal;
