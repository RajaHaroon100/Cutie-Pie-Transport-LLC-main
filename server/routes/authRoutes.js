const express = require('express');
const router = express.Router();
const { sendMessage, CreateUser, adminLogin, placeOrder, getOrderRequests, getPendingOrders, 
    getActiveOrders, getCompletedOrders, rejectOrder, acceptOrder, updateOrder, addCheckpoints,
    getCheckpoints, updateCheckpoints, moveToActiveOrders, moveToCompletedOrders, 
    getCustomerCheckpoints, getCustomerOrder, getPayments, changePaymentStatus,
    getCustomerPayment, addPaymentEmail, getNotifications, deleteNotification,
    squarePayment, acceptIpAgreement, getIpAgreement
 } = require('../controllers/authControllers');

router.post('/createUser', CreateUser);
router.post('/adminLogin', adminLogin);

router.post('/sendMessage', sendMessage);

router.post('/placeOrder', placeOrder);

router.get('/orders/requests', getOrderRequests);
router.get('/orders/pending', getPendingOrders);
router.get('/orders/active', getActiveOrders);
router.get('/orders/completed', getCompletedOrders);

router.delete('/rejectOrder/:id', rejectOrder);
router.put('/acceptOrder/:id', acceptOrder);
router.put('/updateOrder/:id', updateOrder);
router.put('/move/to/active/:id', moveToActiveOrders);
router.put('/move/to/completed/:id', moveToCompletedOrders);

router.post('/add/checkpoints', addCheckpoints);
router.get('/checkpoints', getCheckpoints);
router.put('/update/checkpoints/:id', updateCheckpoints);

router.get('/customer/checkpoints/:trackingId', getCustomerCheckpoints);
router.get('/customer/order/:trackingId', getCustomerOrder);
router.get('/customer/payment/:trackingId', getCustomerPayment);

router.get('/order/payment', getPayments);
router.put('/updatePaymentStatus/:id', changePaymentStatus);
router.post('/add-payment-email', addPaymentEmail);

router.get('/notifications', getNotifications);
router.delete('/delete/notification/:id', deleteNotification);

router.post('/payment/square', squarePayment);

router.post('/submit/ip-agreement', acceptIpAgreement);
router.get('/get/ip-agreement', getIpAgreement);

module.exports = router;

