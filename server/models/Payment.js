const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  trackingId: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  },
  payerEmail: {
    type: String
  },
  paidDate: {
    type: Date
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

