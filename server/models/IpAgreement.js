const mongoose = require('mongoose');

const IpAgreementSchema = new mongoose.Schema({
    signed: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    ipData: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('IpAgreement', IpAgreementSchema);
