import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
import './TrackingDetails.css';

export default function TrackingDetails() {
    const location = useLocation();
    const orderData = location.state;
    const order = orderData ? orderData.data : null;

    const navigate = useNavigate();

    const [checkpointDetails, setCheckpointDetails] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            if (order) {
                try {
                    const { trackingId, status } = order;
                    
                    if (status === 'Pending') {
                        const response = await axios.get(`/customer/payment/${trackingId}`);
                        setPaymentDetails(response.data);
                    } else {
                        const response = await axios.get(`/customer/checkpoints/${trackingId}`);
                        setCheckpointDetails(response.data);
                    }
                } catch (err) {
                    navigate('/trackShipment', { replace: true });
                    toast.error('Something went wrong. Try again.');
                } finally {
                    setLoading(false);
                }
            } else {
                navigate('/trackShipment', { replace: true });
                toast.error('Something went wrong. Try again.');
            }
        };

        fetchDetails();
    }, [order, navigate]);

    const handlePayClick = () => {
        navigate('/order-payment', { replace: true, state : {order} });
    }

    const renderCheckpoints = () => {
        const locations = [
            { label: 'Pickup Point', location: `${order.formData.shippingAddress}, ${order.formData.selectedShippingCountry}`, status: true },
            ...checkpointDetails?.checkpoints.map(cp => ({
                label: `Checkpoint ${cp.location}`,
                location: cp.location,
                status: cp.status
            })) || [],
            { label: 'Delivery Point', location: `${order.formData.deliveryAddress}, ${order.formData.selectedDeliveryCountry}`, status: order.status === 'Completed' }
        ];

        return locations.map((cp, index) => (
            <div key={index} className="flex items-start mb-6">
                <div className="relative flex items-center">
                    <div
                        className={`w-6 h-6 rounded-full z-10 ${cp.status ? 'bg-primary' : 'bg-gray-400'}`}
                    >
                        {cp.status && (
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.285,6.708a1,1,0,0,0-1.414,0L9.5,16.078l-3.79-3.79a1,1,0,1,0-1.414,1.414l4.5,4.5a1,1,0,0,0,1.414,0l10-10A1,1,0,0,0,20.285,6.708Z" />
                            </svg>
                        )}
                    </div>
                    {index < locations.length - 1 && (
                        <div
                            className={`absolute left-1/2 transform -translate-x-1/2 w-1 ${locations[index + 1].status ? 'bg-primary' : 'bg-gray-400'}`}
                            style={{ height: '60px', top: '24px' }}
                        />
                    )}
                </div>
                <div className="ml-4">
                    <p className="font-semibold">{cp.label}</p>
                    <p className="text-gray-600">{cp.location}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="mx-6 md:mx-20 lg:mx-36 my-8 p-4 sm:p-6 md:p-8 bg-accent rounded-xl shadow-md">
            <div className="mb-8 text-center font-semibold">
                <h2 className="text-2xl sm:text-3xl text-heading_1">Shipment Tracking</h2>
                <p className='text-xs sm:text-sm mt-1 text-gray-500'>Order ID: CPT-{order.trackingId}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <p className="text-sm sm:text-xs text-text_1">Pickup Address</p>
                    <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{`${order.formData.shippingAddress}, ${order.formData.selectedShippingCountry}`}</p>
                </div>
                <div>
                    <p className="text-sm sm:text-xs text-text_1">Delivery Address</p>
                    <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{`${order.formData.deliveryAddress}, ${order.formData.selectedDeliveryCountry}`}</p>
                </div>
                <div>
                    <p className="text-sm sm:text-xs text-text_1">Estimated Delivery Date</p>
                    <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{moment(order.formData.deliveryDate).format("MMMM Do, YYYY")}</p>
                </div>
                <div>
                    <p className="text-sm sm:text-xs text-text_1">Current Status</p>
                    <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{order.status}</p>
                </div>
            </div>
    
            <div className="flex flex-col">
                {order.status === 'Pending' ? (
                    paymentDetails?.paymentStatus !== 'Paid' ? (
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-center w-full sm:w-2/3 font-semibold my-6 text-amber-950'>
                                To proceed with your order, an advance payment is required. 
                                Please complete the payment process to continue with the order 
                                fulfillment.
                            </p>
                            <div className='flex flex-col items-center py-4'>
                                <p className="text-text_1">Order Price</p>
                                <p className="text-subHeading_1 text-lg font-semibold">{`${order.formData.quotePrice}`} USD</p>
                            </div>
                            <button
                                className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-2 px-4 bg-primary animated-button-orange text-text_1 rounded-lg`}
                                onClick={handlePayClick}
                            >
                                <span className='font-semibold'>Pay</span>
                            </button>
                            <p className='text-center text-xs sm:text-sm w-full sm:w-2/3 font-semibold my-6 text-amber-950'>
                                If you have any questions or need assistance, do not 
                                hesitate to contact our support team.
                            </p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center'>
                            <p className='text-center w-full sm:w-2/3 font-semibold my-6 text-amber-950'>
                                Your shipment is currently being prepared for dispatch. 
                                Tracking will be available as soon as it is on its way.
                            </p>
                            <div className='flex flex-col items-center mt-4'>
                                <p className="text-sm sm:text-xs text-text_1">Pickup Date</p>
                                <p className="text-subHeading_1 font-semibold text-sm sm:text-base">
                                    {moment(order.formData.pickupDate).format("MMMM Do, YYYY")}
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    <>
                        {loading ? (
                            <p className="text-center text-sm sm:text-base">Getting your shipment's location...</p>
                        ) : (
                            <>
                                {renderCheckpoints()}
                                <p className='text-xs sm:text-sm text-amber-900'>
                                    Orange-filled circles indicate that your shipment has arrived at those locations.
                                </p>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
