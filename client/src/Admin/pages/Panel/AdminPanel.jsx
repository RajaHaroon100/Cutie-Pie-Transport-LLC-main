import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderCard from './Order/OrderCard';
import OrderDetailCard from './Order/OrderDetailCard';
import LoadingModal from './Order/Order Components/LoadingModal';
import SortSVG from '../../../assets/SVGs/sort.svg'
import BellSVG from '../../../assets/SVGs/bell-notification.svg'
import SortDialog from './Order/Order Components/SortDialog';
import NotificationsDialog from './Order/Order Components/NotificationsDialog';
import SignedAgreementCard from './Signed Agreement/SignedAgreementCard';
import AgreementDetailCard from './Signed Agreement/AgreementDetailCard';

export default function AdminPanel() {
    const navigate = useNavigate();
    const { admin, logout } = useAdmin();

    const [loading, setLoading] = useState(false);

    const [selectedSection, setSelectedSection] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const [orderRequests, setOrderRequests] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(null);

    const [notifications, setNotifications] = useState([]);
    const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);

    const [signedAgreements, setSignedAgreements] = useState([]);

    const sortOrders = (orders, criteria) => {
        return [...orders].sort((a, b) => {
            const dateA = new Date(criteria === 'Pickup Date' ? a.formData.pickupDate : criteria === 'Delivery Date' ? a.formData.deliveryDate : a.createdAt);
            const dateB = new Date(criteria === 'Pickup Date' ? b.formData.pickupDate : criteria === 'Delivery Date' ? b.formData.deliveryDate : b.createdAt);
            return dateA - dateB;
        });
    };

    const fetchAndSortOrders = async (fetchFunction, setOrdersFunction) => {
        try {
            setLoading(true);
            const response = await fetchFunction();
            const sortedOrders = sortCriteria ? sortOrders(response.data, sortCriteria) : response.data;
            setOrdersFunction(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSignedAgreements = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/get/ip-agreement');
            setSignedAgreements(response.data);
        } catch (error) {
            console.error('Error fetching signed agreements:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderRequests = () => axios.get('/orders/requests');
    const fetchPendingOrders = () => axios.get('/orders/pending');
    const fetchActiveOrders = () => axios.get('/orders/active');
    const fetchCompletedOrders = () => axios.get('/orders/completed');

    useEffect(() => {
        setSelectedItem('');
    }, [selectedSection]);

    useEffect(() => {
        if (selectedSection === 'orderRequests') fetchAndSortOrders(fetchOrderRequests, setOrderRequests);
        if (selectedSection === 'pendingOrders') fetchAndSortOrders(fetchPendingOrders, setPendingOrders);
        if (selectedSection === 'activeOrders') fetchAndSortOrders(fetchActiveOrders, setActiveOrders);
        if (selectedSection === 'completedOrders') fetchAndSortOrders(fetchCompletedOrders, setCompletedOrders);
        if (selectedSection === 'signedAgreements') fetchSignedAgreements();
    }, [selectedItem, selectedSection, sortCriteria]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [isNotificationsDialogOpen]);

    if (!admin) {
        return <Navigate to="/unauthorizedAccess" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const handleOrderClick = (order) => {
        setSelectedItem(order);
    };

    const handleItemChange = (item) => {
        setSelectedItem(item);
    };

    const handleSortClick = () => {
        setIsSortDialogOpen(!isSortDialogOpen);
    };

    const handleSortOptionClick = (option) => {
        setSortCriteria(option);
        setIsSortDialogOpen(false);
    };

    const handleBellClick = () => {
        setIsNotificationsDialogOpen(!isNotificationsDialogOpen);
    };

    const handleAgreementClick = (agreement) => {
        setSelectedItem(agreement);
    };

    const handleSectionChange = (newSection) => {
        setSelectedItem('');
        setSelectedSection(newSection);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Fixed Left Panel */}
            <div className="w-64 h-screen flex flex-col justify-between bg-gray-900 text-gray-100 py-4 px-4 flex-shrink-0 overflow-hidden">
                <div className='text-gray-400'>
                    <div className='grid grid-cols-5 space-x-2'>
                        {admin && (
                            <div className='col-span-4'>
                                <p className='text-sm font-light pb-2'>Logged In as</p>
                                <p className="text-lg font-semibold mb-4 pl-4">{admin.username}</p>
                            </div>
                        )}
                        <div className='max-w-8 pt-2'>
                            <img
                                className='relative cursor-pointer hover:opacity-60 transition-opacity'
                                src={BellSVG}
                                alt="bell-svg"
                                onClick={handleBellClick}
                            />
                            {notifications.length > 0 &&
                                <div className='absolute top-7 ml-4 bg-red-500 p-1.5 rounded-full'></div>
                            }
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='mb-4'>
                        <h2 className="text-xl font-bold mb-1 mt-4">Orders</h2>
                        <button
                            onClick={() => handleSectionChange('orderRequests')}
                            className={`block w-full text-left p-2 rounded ${selectedSection === 'orderRequests' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-800 text-gray-100'}`}
                        >
                            Requests
                        </button>
                        <button
                            onClick={() => handleSectionChange('pendingOrders')}
                            className={`block w-full text-left p-2 rounded ${selectedSection === 'pendingOrders' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-800 text-gray-100'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => handleSectionChange('activeOrders')}
                            className={`block w-full text-left p-2 rounded ${selectedSection === 'activeOrders' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-800 text-gray-100'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => handleSectionChange('completedOrders')}
                            className={`block w-full text-left p-2 rounded ${selectedSection === 'completedOrders' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-800 text-gray-100'}`}
                        >
                            Completed
                        </button>
                    </div>
                    <div className='mb-4'>
                        <h2 className="text-xl font-bold mb-1 mt-4">Customer Relations</h2>
                        <button
                            onClick={() => handleSectionChange('signedAgreements') }
                            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
                        >
                            Signed Agreements
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <button onClick={handleLogout} className="w-full mb-4 border border-gray-900 bg-gray-200 hover:bg-gray-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Log Out
                    </button>
                    <p className='text-gray-500 text-sm'>&copy; 2024 Cutie Pie Transport, LLC</p>
                </div>
            </div>

            {/* Dynamic Panel for List */}
            <div className="w-80 text-gray-800 bg-gray-100 overflow-y-auto resize-x">
                {!selectedSection && (
                    <div>
                        <h2 className='text-gray-500 p-4'>Nothing Selected</h2>
                    </div>
                )}
                {selectedSection === 'orderRequests' && (
                    <div>
                        <SortDialog
                            title="Order Requests"
                            orderArray={orderRequests}
                            handleSortClick={handleSortClick}
                            handleSortOptionClick={handleSortOptionClick}
                            isSortDialogOpen={isSortDialogOpen}
                            sortCriteria={sortCriteria}
                        />
                        <div className='overflow-y-auto flex-grow mt-4'>
                            {orderRequests.length === 0 ?
                                <div className='flex justify-center items-center'>
                                    <p>No Order Request</p>
                                </div>
                                :
                                orderRequests.map(order => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onClick={handleOrderClick}
                                        isSelected={selectedItem?._id === order._id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )}
                {selectedSection === 'pendingOrders' && (
                    <div>
                        <SortDialog
                            title="Pending Orders"
                            orderArray={pendingOrders}
                            handleSortClick={handleSortClick}
                            handleSortOptionClick={handleSortOptionClick}
                            isSortDialogOpen={isSortDialogOpen}
                            sortCriteria={sortCriteria}
                        />
                        <div className='overflow-y-auto flex-grow mt-4'>
                            {pendingOrders.length === 0 ?
                                <div className='flex justify-center items-center'>
                                    <p>No Pending Order</p>
                                </div>
                                :
                                pendingOrders.map(order => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onClick={handleOrderClick}
                                        isSelected={selectedItem?._id === order._id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )}
                {selectedSection === 'activeOrders' && (
                    <div>
                        <SortDialog
                            title="Active Orders"
                            orderArray={activeOrders}
                            handleSortClick={handleSortClick}
                            handleSortOptionClick={handleSortOptionClick}
                            isSortDialogOpen={isSortDialogOpen}
                            sortCriteria={sortCriteria}
                        />
                        <div className='overflow-y-auto flex-grow mt-4'>
                            {activeOrders.length === 0 ?
                                <div className='flex justify-center items-center'>
                                    <p>No Active Order</p>
                                </div>
                                :
                                activeOrders.map(order => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onClick={handleOrderClick}
                                        isSelected={selectedItem?._id === order._id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )}
                {selectedSection === 'completedOrders' && (
                    <div>
                        <SortDialog
                            title="Completed Orders"
                            orderArray={completedOrders}
                            handleSortClick={handleSortClick}
                            handleSortOptionClick={handleSortOptionClick}
                            isSortDialogOpen={isSortDialogOpen}
                            sortCriteria={sortCriteria}
                        />
                        <div className='overflow-y-auto flex-grow mt-4'>
                            {completedOrders.length === 0 ?
                                <div className='flex justify-center items-center'>
                                    <p>No Completed Order</p>
                                </div>
                                :
                                completedOrders.map(order => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onClick={handleOrderClick}
                                        isSelected={selectedItem?._id === order._id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )}
                {selectedSection === 'signedAgreements' && (
                    signedAgreements.length === 0 ?
                        <div className='flex justify-center items-center'>
                            <p>No Signed Agreements</p>
                        </div>
                        :
                        <div>
                            <div className='text-xl font-bold p-4 border-b border-gray-300 shadow-md sticky top-0 bg-gray-100'>
                                <h2 className="">
                                    Signed Agreements
                                    <span className='ml-4 text-xs bg-gray-900 text-gray-100 px-2 py-1 rounded-full'>{signedAgreements.length}</span>
                                </h2>
                            </div>
                            {signedAgreements.map(agreement => (
                                <SignedAgreementCard
                                    key={agreement._id}
                                    agreement={agreement}
                                    onClick={handleAgreementClick}
                                    isSelected={selectedItem?._id === agreement._id}
                                />
                            ))}
                        </div>
                )}
            </div>

            {/* Dynamic Panel for Item Details */}
            <div className="flex-1 bg-white p-4 border-l border-gray-300 overflow-y-auto">
                {selectedItem ? (
                    selectedSection !== 'signedAgreements' ? (
                        <OrderDetailCard order={selectedItem} onItemChange={handleItemChange} />
                    ) : (
                        <AgreementDetailCard agreement={selectedItem} />
                    )
                ) : (
                    <div className="h-screen flex justify-center items-center">
                        <p className="text-gray-500">
                            {selectedSection !== 'signedAgreements' ? 'Select an order to view details.' : 'Select an agreement to view details.'}
                        </p>
                    </div>
                )}
            </div>


            <NotificationsDialog
                notifications={notifications}
                isOpen={isNotificationsDialogOpen}
                onClose={() => setIsNotificationsDialogOpen(false)}
            />

            <LoadingModal isOpen={loading} />
        </div>
    );
}

