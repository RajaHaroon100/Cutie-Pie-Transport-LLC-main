const mongoose = require('mongoose');

const NextTrackingIdSchema = new mongoose.Schema({
    nextId: { type: Number, default: 1, required: true }
});

const NextTrackingId = mongoose.model('NextTrackingId', NextTrackingIdSchema);

module.exports = NextTrackingId;
