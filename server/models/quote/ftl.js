const mongoose = require('mongoose')
const { Schema } = mongoose

const ftlQuoteSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    trailerSize: String,
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

const FTLQuoteModel = mongoose.model('FTLQuote', ftlQuoteSchema);

module.exports = FTLQuoteModel;