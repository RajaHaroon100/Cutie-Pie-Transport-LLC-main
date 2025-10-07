import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_orange.css';

const EditOrderModal = ({ isOpen, onClose, order, onSave }) => {
    const [pickupDate, setPickupDate] = useState(new Date(order.formData.pickupDate));
    const [deliveryDate, setDeliveryDate] = useState(new Date(order.formData.deliveryDate));
    const [quotePrice, setQuotePrice] = useState(order.formData.quotePrice);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        setPickupDate(new Date(order.formData.pickupDate));
        setDeliveryDate(new Date(order.formData.deliveryDate));
        setQuotePrice(order.formData.quotePrice);
    }, [order]);

    useEffect(() => {
        const isFormValid = pickupDate && deliveryDate && quotePrice && pickupDate <= deliveryDate;
        setIsSaveDisabled(!isFormValid);
    }, [pickupDate, deliveryDate, quotePrice]);

    const handleSave = () => {
        const updatedOrder = {
            pickupDate,
            deliveryDate,
            quotePrice,
        };
        onSave(order._id, updatedOrder);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={false}
            className="w-11/12 max-w-lg mx-auto my-20 bg-white rounded-lg shadow-lg p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Edit Order Details</h2>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Pickup Date</label>
                    <Flatpickr
                        value={pickupDate}
                        onChange={(date) => setPickupDate(date[0])}
                        options={{
                            minDate: 'today',
                            dateFormat: 'm-d-Y',
                        }}
                        required
                        className="w-full mt-2 px-3 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Delivery Date</label>
                    <Flatpickr
                        value={deliveryDate}
                        onChange={(date) => setDeliveryDate(date[0])}
                        options={{
                            minDate: pickupDate,
                            dateFormat: 'm-d-Y',
                        }}
                        required
                        className="w-full mt-2 px-3 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Quote Price (USD)</label>
                    <input
                        type="number"
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                        className={`w-full px-4 py-2 rounded-lg text-white ${isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-600'}`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditOrderModal;
