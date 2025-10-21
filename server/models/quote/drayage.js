const mongoose = require('mongoose')
const { Schema } = mongoose

const drayageQuoteSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    equipmentSize: String,
    weight: String,
    agree: Boolean,
    title: String,
    company: String,
    origin: String,
    destination: String,
    loadingDate: String,
    deliveryDate: String,
    description: String,
    containersNumber: String,
    commodity: String,
    equipmentType: 
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

const DrayageQuoteModel = mongoose.model('DrayageQuote', drayageQuoteSchema);

module.exports = DrayageQuoteModel;
