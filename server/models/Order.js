const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    minTemp: { type: Number, required: false },
    maxTemp: { type: Number, required: false },
});

const ItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    numPallets: { type: Number, required: true },
    packaging: { type: String, required: true },
    weight: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    condition: { type: String, required: true },
});

const TrailerConfigSchema = new mongoose.Schema({
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    maxWeight: { type: Number, required: true },
});

const FormDataSchema = new mongoose.Schema({
    quoteType: { type: String, required: true },
    selectedEquipment: { type: String, required: true },
    temperature: TemperatureSchema,
    selectedShippingCountry: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    additionalShippingLocations: { type: [String], required: false },
    selectedDeliveryCountry: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    additionalDeliveryLocations: { type: [String], required: false },
    pickupDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    additionalServices: { type: [String], required: false },
    items: { type: [ItemSchema], required: true },
    availableVolume: { type: Number, required: true },
    availableWeight: { type: Number, required: true },
    TRAILER_CONFIG: TrailerConfigSchema,
    shipmentFreightClass: { type: String, required: false },
    shippingLocationType: { type: String, required: false },
    deliveryLocationType: { type: String, required: false },
    distance: {type: Number, required: true},
    quotePrice: { type: Number, required: true },
});

const PersonalDetailsSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    phoneExtension: { type: String, required: false },
    company: { type: String, required: false },
});

const AppointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    timeZone: { type: String, required: true },
});

const AddressesSchema = new mongoose.Schema({
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
    personalDetails: PersonalDetailsSchema,
    appointmentDate: AppointmentSchema,
    formData: FormDataSchema,
    addresses: AddressesSchema,
    status: {type: String, default: 'Request',  required: true},
    trackingId: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);


