import React, { useState, useEffect } from "react";
import axios from 'axios';
import RejectOrderModal from './Order Components/RejectOrderModal';
import EditOrderModal from './Order Components/EditOrderModal';
import LoadingModal from './Order Components/LoadingModal';
import AddCheckpointModal from './Order Components/AddCheckpointModal';
import UpdateCheckpointsModal from "./Order Components/UpdateCheckpointsModal";
import OrderDetails from "./OrderDetails";
import { toast } from 'react-hot-toast';
import '../AdminPanel.css'

const OrderDetailCard = ({ order: initialOrder, onItemChange }) => {
    const [order, setOrder] = useState(initialOrder);
    const [checkpoints, setCheckpoints] = useState([]);
    const [payment, setPayment] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [rejectBoxOpen, setRejectBoxOpen] = useState(false);
    const [checkpointModalOpen, setCheckpointModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isUpdateCheckpointsModalOpen, setIsUpdateCheckpointsModalOpen] = useState(false);
    
    if (!order) return null;

    useEffect(() => {
        setOrder(initialOrder);
    }, [initialOrder]);

    useEffect(() => {
        if (order && order._id) {
            getCheckpoints();
            getPayment();
        }
    }, [order]);

    const handleReject = () => {
        setRejectBoxOpen(true);
    }

    const handleClose = () => {
        setRejectBoxOpen(false);
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleAddCheckpoints = () => {
        setCheckpointModalOpen(true);
    };

    const handleUpdateOrder = async (orderId, updatedOrder) => {
        setLoading(true);
        try {
            const response = await axios.put(`/updateOrder/${orderId}`, updatedOrder);
            if (response.status === 200) {
                setOrder(prevOrder => ({
                    ...prevOrder,
                    formData: {
                        ...prevOrder.formData,
                        ...updatedOrder
                    }
                }));
                toast.success("Order updated successfully.");
            }
        } catch (error) {
            toast.error("Failed to update order. Try Again!");
        }  finally {
            setLoading(false);
        }
    };

    const rejectOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.delete(`/rejectOrder/${order._id}`, {
                data: { message }
            });
            setRejectBoxOpen(false);
            onItemChange('');
            toast.success('Order rejected successfully.');
        } catch (error) {
            toast.error('Failed to reject the order. Try again!');
        } finally {
            setLoading(false);
        }
    }

    const handleAccept = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`/acceptOrder/${order._id}`);
            if (response.status === 200) {
                onItemChange('');
                toast.success(`Order Accepted with Tracking ID: CPT-${response.data.trackingId}`);
            }
        } catch (error) {
            toast.error('Failed to accept order. Try Again!');
        }  finally {
            setLoading(false);
        }
    };

    const handleMoveToActiveOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`/move/to/active/${order._id}`);
            if (response.status === 200) {
                onItemChange('');
                toast.success('Order moved to active orders.');
            }
        } catch (error) {
            toast.error('Failed to move order. Try Again!');
        }  finally {
            setLoading(false);
        }
    };
    
    const handleMoveToCompletedOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`/move/to/completed/${order._id}`);
            if (response.status === 200) {
                onItemChange('');
                toast.success('Order completed.');
            }
        } catch (error) {
            toast.error('Failed to move order. Try Again!');
        }  finally {
            setLoading(false);
        }
    };

    const handleSaveCheckpoints = async (checkpoints, checkpointId) => {
        const payload = {
            orderId: order._id,
            trackingId: order.trackingId,
            checkpoints
        };
    
        setLoading(true);
        try {
            if (checkpointId) {
                const response = await axios.put(`/update/checkpoints/${checkpointId}`, payload);
                if (response.status === 200) {
                    getCheckpoints();
                    toast.success('Checkpoints updated successfully');
                }
            } else {
                const response = await axios.post('/add/checkpoints', payload);
                if (response.status === 201) {
                    getCheckpoints();
                    toast.success('Checkpoints saved successfully');
                }
            }
        } catch (error) {
            toast.error('Error saving checkpoints. Try Again!');
        } finally {
            setLoading(false);
        }
    };
    
    const getCheckpoints = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/checkpoints', {
                params: { orderId: order._id }
            });
            if (response.status === 200) {
                setCheckpoints(response.data);
            }
        } catch (error) {
            console.error('Error fetching checkpoints:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPayment = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/order/payment', {
                params: { orderId: order._id }
            });
            if (response.status === 200) {
                setPayment(response.data);
            }
        } catch (error) {
            console.error('Error fetching payment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentStatusChange = async (status) => {
        setLoading(true);
        try {
            const response = await axios.put(`/updatePaymentStatus/${payment[0]._id}`, { paymentStatus: status });
            if (response.status === 200) {
                setPayment(prevPayment => ({
                    ...prevPayment,
                    paymentStatus: status
                }));
                toast.success('Payment status updated successfully.');
                
            }
        } catch (error) {
            toast.error('Failed to update payment status. Try Again!');
        } finally {
            setLoading(false);
            getPayment();
        }
    };

    const handleUpdateCheckpoints = (updatedCheckpoints) => {
        const updatedOrder = {
            ...order,
            checkpoints: updatedCheckpoints.map(cp => ({ ...cp, updatedAt: new Date() })) // Optionally update timestamps
        };
        handleSaveCheckpoints(updatedOrder.checkpoints, checkpoints[0]._id); // Save using existing ID
    };
        

    return (
        <div className="bg-white p-4">
            
            <OrderDetails order={order}/>

            {order.status != 'Completed' &&
                <button
                        onClick={handleEdit}
                        className="w-full mt-2 mb-4 border border-gray-900  hover:bg-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300"
                    >
                        Edit Order Details
                </button>
            }

            {payment.length > 0 && (
                <div className="my-4">
                    <h2>Payment</h2>
                    <div className="px-4 py-2 my-2 border font-semibold rounded-md border-secondary bg-gray-50">
                        <p>
                            <span className="font-normal">Payment Status: </span>
                            <span className={`${payment[0].paymentStatus != "Not Paid" ? 'text-green-500' : 'text-red-500'}`}>{payment[0].paymentStatus}</span>
                        </p>
                        {payment[0].payerEmail != null &&
                            <div className="mt-1">
                                <p className="font-normal">Payment initiated by <strong>{payment[0].payerEmail}</strong> via <span className="text-purple-800 font-semibold">Zelle</span></p>
                            </div>
                        }
                        {order.status === 'Pending' &&
                            <div className="mt-4 mb-2 font-normal flex items-center">
                                <p>Set payment status: </p>
                                <div className="flex items-center font-semibold text-sm ml-2">
                                    <label htmlFor="paid" className="radio-label first">
                                        <input 
                                            type="radio" 
                                            id="paid" 
                                            name="paymentStatus" 
                                            checked={payment[0]?.paymentStatus === 'Paid'} 
                                            onChange={() => handlePaymentStatusChange('Paid')}
                                            className="hidden"
                                        />
                                        <span className="radio-button">Paid</span>
                                    </label>
                                    <label htmlFor="notPaid" className="radio-label last">
                                        <input 
                                            type="radio" 
                                            id="notPaid" 
                                            name="paymentStatus" 
                                            checked={payment[0]?.paymentStatus === 'Not Paid'} 
                                            onChange={() => handlePaymentStatusChange('Not Paid')}
                                            className="hidden"
                                        />
                                        <span className="radio-button">Not Paid</span>
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}

            {checkpoints.length > 0 && (
                <div className="mt-4 mb-8">
                    <h2>Checkpoints</h2>
                    <div className="px-4 py-2 my-2 border font-semibold rounded-md border-secondary bg-gray-50">
                        {checkpoints[0].checkpoints.map((cp, index) => (
                            <p key={index} className="my-2">
                                <span className="font-normal">{index + 1}:</span> {cp.location}
                                <span className={`ml-2 ${cp.status ? 'text-green-500' : 'text-red-500'}`}>({cp.status ? 'Reached' : 'Not Reached'})</span>
                            </p>
                        ))}
                    </div>
                    {(order.status === 'Active' && checkpoints.length > 0) &&
                        <button onClick={() => setIsUpdateCheckpointsModalOpen(true)} className="w-full mt-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300">
                            Update Checkpoint Status
                        </button>
                    }
                    {order.status != 'Completed' &&
                        <button
                            onClick={handleAddCheckpoints}
                            className="w-full mt-2 mb-4 border border-gray-900  hover:bg-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300"
                        >
                            Edit Checkpoint Locations
                        </button>
                    }
                    
                </div>
            )}

            {order.status === 'Request' &&
                <>
                    <div className='flex space-x-8 px-8 mt-4 pt-4 border-t border-gray-300'>
                        <button onClick={handleReject} className="w-full mb-4 border border-gray-900 bg-red-600 hover:bg-red-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300">
                            Reject
                        </button>
                        <button onClick={handleAccept} className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300">
                            Accept
                        </button>
                    </div>
                </>
            }

            {order.status === 'Pending' &&
                <>
                    <div className='flex space-x-8 px-8 mt-4 pt-4 border-t border-gray-300'>
                        {checkpoints.length > 0 ? (
                            payment.length > 0 && payment[0].paymentStatus !== 'Not Paid' ? (
                                <button 
                                    onClick={handleMoveToActiveOrders} 
                                    className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300"
                                >
                                    Move to Active Orders
                                </button>
                            ) : null
                        ) : (
                            <button 
                                onClick={handleAddCheckpoints} 
                                className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300"
                            >
                                Add Checkpoints
                            </button>
                        )}
                    </div>
                </>
            
            }

            {order.status === 'Active' && checkpoints.length > 0 && checkpoints[0].checkpoints[checkpoints[0].checkpoints.length - 1].status === true && (
                <div className='flex space-x-8 px-8 mt-4 pt-4 border-t border-gray-300'>
                    <button onClick={handleMoveToCompletedOrders} className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300">
                        Move to Completed Orders
                    </button>
                </div>
            )}

            <RejectOrderModal
                isOpen={rejectBoxOpen}
                onRequestClose={handleClose}
                onReject={rejectOrder}
                handleChange={handleChange}
            />

            <EditOrderModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                order={order}
                onSave={handleUpdateOrder}
            />

            <AddCheckpointModal
                isOpen={checkpointModalOpen}
                onClose={() => setCheckpointModalOpen(false)}
                onSave={handleSaveCheckpoints}
                pickupLocation={order.formData.shippingAddress}
                deliveryLocation={order.formData.deliveryAddress}
                pickupCountry={order.formData.selectedShippingCountry}
                deliveryCountry={order.formData.selectedDeliveryCountry}
                existingCheckpoints={checkpoints.length > 0 ? checkpoints[0].checkpoints : []}
                checkpointId={checkpoints.length > 0 ? checkpoints[0]._id : null}
            />

            <UpdateCheckpointsModal
                isOpen={isUpdateCheckpointsModalOpen}
                onRequestClose={() => setIsUpdateCheckpointsModalOpen(false)}
                pickupLocation={order.formData.shippingAddress}
                deliveryLocation={order.formData.deliveryAddress}
                pickupCountry={order.formData.selectedShippingCountry}
                deliveryCountry={order.formData.selectedDeliveryCountry}
                checkpoints={checkpoints.length > 0 ? checkpoints[0].checkpoints : []}
                onUpdate={handleUpdateCheckpoints}
            />

            <LoadingModal isOpen={loading} />

        </div>
    );
};

export default OrderDetailCard;

