const mongoose = require('mongoose')
const { Schema } = mongoose

const ltlQuoteSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    length: String,
    weight: String,
    agree: Boolean,
    title: String,
    company: String,
    origin: String,
    destination: String,
    loadingDate: String,
    deliveryDate: String,
    description: String,
    equipment: 
    { 
        type: String, 
    },
    status: 
    { 
        type: String, 
        default: 'pending' 
    },
    requestedOn: 
    { 
        type: Date, 
        default: Date.now 
    },
})

const LTLQuoteModel = mongoose.model('LTLQuote', ltlQuoteSchema);

module.exports = LTLQuoteModel;
