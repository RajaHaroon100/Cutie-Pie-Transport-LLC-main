const mongoose = require('mongoose');

const CheckpointSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    trackingId: {
        type: String,
        required: true
    },
    checkpoints: [{
        location: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Checkpoint', CheckpointSchema); 



