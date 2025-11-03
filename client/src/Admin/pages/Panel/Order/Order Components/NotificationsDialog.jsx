import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function NotificationsDialog({ notifications, isOpen, onClose }) {
    const [orderDetails, setOrderDetails] = useState({});
    const [localNotifications, setLocalNotifications] = useState(notifications);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setLocalNotifications(notifications); // Sync local state with props
    }, [notifications]);

    useEffect(() => {
        if (isOpen && localNotifications.length > 0) {
            const fetchOrderDetails = async () => {
                setIsLoading(true);
                try {
                    const trackingIds = localNotifications.map(notification => notification.trackingId);
                    const uniqueTrackingIds = [...new Set(trackingIds)];
                    const orderDetailsMap = {};

                    for (const trackingId of uniqueTrackingIds) {
                        const response = await axios.get(`/customer/order/${trackingId}`);
                        orderDetailsMap[trackingId] = response.data;
                    }

                    setOrderDetails(orderDetailsMap);
                } catch (error) {
                    console.error('Error fetching order details:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchOrderDetails();
        }
    }, [isOpen, localNotifications]);

    const handleDelete = async (notificationId) => {
        try {
            await axios.delete(`/delete/notification/${notificationId}`);

            setLocalNotifications(prevNotifications =>
                prevNotifications.filter(notification => notification._id !== notificationId)
            );
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-12 left-56 bg-white shadow-lg rounded-lg w-64 h-64 overflow-y-auto z-50 scrollbar-hidden">
            <div className="sticky top-0 bg-white shadow-sm px-4 z-50 py-2 border-b">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                    className="absolute top-2.5 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
            <div className="z-40 relative">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <svg
                            className="animate-spin h-6 w-6 text-secondary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12" cy="12" r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    localNotifications.length > 0 ? (
                        localNotifications.map((notification, index) => (
                            <div key={index} className="relative hover:bg-gray-300 border-b pt-8 p-4">
                                <button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
                                    onClick={() => handleDelete(notification._id)}
                                >
                                    &#10005;
                                </button>
                                {notification.type === 'payment' && orderDetails[notification.trackingId] && (
                                    <div className="text-xs text-gray-800 font-semibold">
                                        <p>
                                            {orderDetails[notification.trackingId].personalDetails.fullName + " "}
                                            has initiated payment for Order ID
                                            {" CPT-" + orderDetails[notification.trackingId].trackingId}.
                                        </p>
                                    </div>
                                )}
                                <p className="text-xs text-gray-500">{moment(notification.createdAt).format("MMMM Do, YYYY, h:mm a")}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 p-4">No notifications</p>
                    )
                )}
            </div>
        </div>
    );
}


