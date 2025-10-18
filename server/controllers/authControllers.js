const User = require('../models/user');
const Order = require('../models/Order');
const NextTrackingId = require('../models/NextTrackingId');
const Checkpoint = require('../models/Checkpoint');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const IpAgreement = require('../models/IpAgreement');

const nodemailer = require('nodemailer');
require('dotenv').config();
const { hashPassword, comparePassword} = require('../helpers/auth')
const { generateToken } = require('../helpers/jwtUtils');

const { Client } = require('square');
const { randomUUID } = require('crypto');

const CreateUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Encrypt the password
        const hashedPassword = await hashPassword(password)

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const sendMessage = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Set up email data
    const mailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER
        },
        to: process.env.ADMIN_MAIL,
        subject: `New Customer Query from ${firstName} ${lastName} - Cutie Pie Transport`,
        text: `You have a new contact form submission.\n\nName: ${firstName} ${lastName}\nCustomer's Phone Number: ${phoneNumber}\nCustomer's Email: ${email}\nCustomer's Query: ${message}\n\nNote: This is an automated message, please do not reply to this email. Respond to the customer at ${email}.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">New Customer Query from ${firstName} ${lastName}</h3>
                    <p><strong>Customer's Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Customer's Phone Number:</strong> ${phoneNumber}</p>
                    <p><strong>Customer's Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Customer's Query:</strong></p>
                    <div style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
                        <pre>${message}</pre>
                    </div>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>Note: This is an automated message, please do not reply to this email. Respond to the customer at <a href="mailto:${email}">${email}</a>.</p>
                </footer>
            </div>
        `,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message', error });
    }
}

const sendPlaceOrderAdminEmail = async (newOrder) => {
    const { fullName } = newOrder.personalDetails;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const adminMailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: process.env.ADMIN_MAIL,
        subject: `New Order Placed by ${fullName}`,
        text: `A new order has been placed by ${fullName}. Check the admin panel for details.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">New Order Placed by ${fullName}</h3>
                    <p>Check the admin panel for details.</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(adminMailOptions);
};

const sendPlaceOrderCustomerEmail = async (newOrder) => {
    const { fullName, email } = newOrder.personalDetails;
    const { quoteType, pickupDate, deliveryDate, shippingAddress, deliveryAddress, quotePrice } = newOrder.formData;
    const { date: appointmentDate, time: appointmentTime } = newOrder.appointmentDate;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const customerMailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: 'Order Placed - Cutie Pie Transport',
        text: `Dear ${fullName}, your order has been placed successfully. You will soon get a call from the Cutie Pie Transport LLC team for order confirmation and to discuss further details. Order Details: Order Type: ${quoteType}, Pickup Date: ${pickupDate}, Delivery Date: ${deliveryDate}, Shipping Address: ${shippingAddress}, Delivery Address: ${deliveryAddress}, Appointment Date: ${appointmentDate}, Appointment Time: ${appointmentTime}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">Order Placed Successfully</h3>
                    <p>Dear ${fullName},</p>
                    <p>Your order has been placed successfully. You will receive a call from the Cutie Pie Transport LLC team on the appointment date and time for order confirmation and to discuss further details.</p>
                </section>
                <section style="padding: 20px; border-top: 1px solid #ddd;">
                    <h4 style="color: #333;">Order Details</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Order Price:</strong> <br /> $${quotePrice} USD
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Order Type:</strong> <br /> ${quoteType}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Pickup Date:</strong> <br /> ${new Date(pickupDate).toLocaleDateString()}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Delivery Date:</strong> <br /> ${new Date(deliveryDate).toLocaleDateString()}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Shipping Address:</strong> <br /> ${shippingAddress}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Delivery Address:</strong> <br /> ${deliveryAddress}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Appointment Date:</strong> <br /> ${new Date(appointmentDate).toLocaleDateString()}
                        </div>
                        <div style="border: 1px solid #ccc; padding: 10px;">
                            <strong>Appointment Time:</strong> <br /> ${appointmentTime}
                        </div>
                    </div>
                </section>
                <section style="padding: 20px;">
                    <p>If you have any further questions or need assistance, please do not hesitate to contact us:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Phone:</strong> +1 (770) 572-5863</li>
                        <li><strong>Email:</strong> <a href="mailto:cutiepietransport@gmail.com">cutiepietransport@gmail.com</a></li>
                    </ul>
                    <p>Thank you for choosing Cutie Pie Transport LLC.</p>
                    <p>Best of luck and best wishes,</p>
                    <p>Cutie Pie Transport LLC</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(customerMailOptions);
};

const placeOrder = async (req, res) => {
    try {
        const { personalDetails, appointmentDate, addresses, formData } = req.body;

        const newOrder = new Order({
            personalDetails,
            appointmentDate,
            addresses,
            formData,
        });

        const savedOrder = await newOrder.save();

        await sendPlaceOrderAdminEmail(savedOrder);
        await sendPlaceOrderCustomerEmail(savedOrder);

        res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'An error occurred while placing the order' });
    }
}

const getOrderRequests = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Request' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order requests:', error);
        res.status(500).json({ message: 'Error fetching order requests' });
    }
};

const getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Pending' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        res.status(500).json({ message: 'Error fetching pending orders' });
    }
};

const getActiveOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Active' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching active orders:', error);
        res.status(500).json({ message: 'Error fetching active orders' });
    }
};

const getCompletedOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Completed' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching completed orders:', error);
        res.status(500).json({ message: 'Error fetching completed orders' });
    }
};

const sendRejectionEmail = async (customerDetails, message) => {
    const { fullName, email } = customerDetails;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: 'Order Rejected - Cutie Pie Transport',
        text: `Dear ${fullName}, we regret to inform you that your order has been rejected. ${message ? `Reason: ${message}` : ''}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">Order Rejected</h3>
                    <p>Dear ${fullName},</p>
                    <p>We regret to inform you that your order has been rejected.</p>
                    ${message ? `<p><strong>Reason:</strong> ${message}</p>` : ''}
                    <p>We sincerely apologize for any inconvenience this may cause. If you have any queries or need further assistance, you can reach us at:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Phone:</strong> +1 (770) 572-5863</li>
                        <li><strong>Email:</strong> <a href="mailto:cutiepietransport@gmail.com">cutiepietransport@gmail.com</a></li>
                    </ul>
                    <p>Thank you for considering Cutie Pie Transport LLC.</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

const rejectOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { message } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await sendRejectionEmail(order.personalDetails, message);

        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order rejected and deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the order' });
    }
};

const sendOrderAcceptanceEmail = async (order) => {
    const { fullName, email } = order.personalDetails;
    const trackingId = order.trackingId;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const acceptanceMailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: 'Order Accepted - Cutie Pie Transport',
        text: `Dear ${fullName},\n\nWe are pleased to inform you that your order has been accepted. Your Order ID is: CPT-${trackingId}.\n\nYou can use this Order ID to monitor the status of your order. If you have any questions or need further assistance, please do not hesitate to contact us.\n\nThank you for choosing Cutie Pie Transport LLC.\n\nBest regards,\nCutie Pie Transport LLC`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">Order Accepted</h3>
                    <p>Dear ${fullName},</p>
                    <p>We are pleased to inform you that your order has been accepted.</p>
                    <p>Order ID:</p>
                    <div style="text-align: center; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #f97316; font-size: 24px; margin: 0;">CPT-${trackingId}</h2>
                    </div>
                    <p>You can use this Order ID to monitor the status of your order. If you have any questions or need further assistance, please do not hesitate to contact us:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Phone:</strong> +1 (770) 572-5863</li>
                        <li><strong>Email:</strong> <a href="mailto:cutiepietransport@gmail.com">cutiepietransport@gmail.com</a></li>
                    </ul>
                    <p>Thank you for choosing Cutie Pie Transport LLC.</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(acceptanceMailOptions);
};

const acceptOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        let trackingIdDoc = await NextTrackingId.findOne();
        if (!trackingIdDoc) {
            trackingIdDoc = new NextTrackingId();
        }

        const newTrackingId = trackingIdDoc.nextId.toString().padStart(6, '0');

        order.status = 'Pending';
        order.trackingId = newTrackingId;
        await order.save();

        trackingIdDoc.nextId += 1;
        await trackingIdDoc.save();

        // Create a new payment entry
        const payment = new Payment({
            orderId: order._id,
            trackingId: newTrackingId,
            paymentStatus: 'Not Paid',
            paidDate: null
        });
        await payment.save();

        await sendOrderAcceptanceEmail(order);

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send("Failed to accept order. Try Again!");
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { pickupDate, deliveryDate, quotePrice } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.formData.pickupDate = pickupDate;
        order.formData.deliveryDate = deliveryDate;
        order.formData.quotePrice = quotePrice;

        await order.save();

        res.json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const addCheckpoints = async (req, res) => {
    try {
        const { orderId, trackingId, checkpoints } = req.body;

        if (!orderId || !trackingId || !checkpoints || !checkpoints.length) {
            return res.status(400).json({ message: 'Order ID, Tracking ID, and Checkpoints are required' });
        }

        const newCheckpoint = new Checkpoint({
            orderId,
            trackingId,
            checkpoints
        });

        await newCheckpoint.save();
        res.status(201).json({ message: 'Checkpoints saved successfully', checkpoint: newCheckpoint });
    } catch (error) {
        console.error('Error saving checkpoints:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCheckpoints = async (req, res) => {
    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ message: 'orderId query parameter is required' });
        }

        const checkpoints = await Checkpoint.find({ orderId });

        res.status(200).json(checkpoints);
    } catch (error) {
        console.error('Error fetching checkpoints:', error);
        res.status(500).json({ message: 'Error fetching checkpoints' });
    }
};

const updateCheckpoints = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderId, trackingId, checkpoints } = req.body;

        const checkpoint = await Checkpoint.findByIdAndUpdate(
            id,
            { orderId, trackingId, checkpoints },
            { new: true }
        );

        if (!checkpoint) {
            return res.status(404).json({ error: 'Checkpoint not found' });
        }

        res.status(200).json(checkpoint);
    } catch (error) {
        console.error('Error updating checkpoints:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const sendOrderActiveEmail = async (order) => {
    const { fullName, email } = order.personalDetails;
    const trackingId = order.trackingId;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const activeMailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: 'Order Now Active - Cutie Pie Transport',
        text: `Dear ${fullName},\n\nWe are pleased to inform you that your order is now active and is currently being processed. You can use the tracking ID below to view the status and checkpoints of your order.\n\nTracking ID: CPT-${trackingId}\n\nThank you for choosing Cutie Pie Transport LLC. If you have any questions or need further assistance, please feel free to reach out to us.\n\nBest regards,\nCutie Pie Transport LLC`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">Order Now Active</h3>
                    <p>Dear ${fullName},</p>
                    <p>We are pleased to inform you that your order is now active and is currently being processed. You can use the tracking ID below to view the status and checkpoints of your order.</p>
                    <p><strong>Order ID:</strong></p>
                    <div style="text-align: center; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #f97316; font-size: 24px; margin: 0;">CPT-${trackingId}</h2>
                    </div>
                    <p>If you have any questions or need further assistance, please feel free to reach out to us:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Phone:</strong> +1 (770) 572-5863</li>
                        <li><strong>Email:</strong> <a href="mailto:cutiepietransport@gmail.com">cutiepietransport@gmail.com</a></li>
                    </ul>
                    <p>Thank you for choosing Cutie Pie Transport LLC.</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(activeMailOptions);
};

const moveToActiveOrders = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        order.status = 'Active';
        await order.save();

        await sendOrderActiveEmail(order);

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send("Failed to move order to active. Try Again!");
    }
}

const sendOrderCompletedEmail = async (order) => {
    const { fullName, email } = order.personalDetails;
    const trackingId = order.trackingId;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const completedMailOptions = {
        from: {
            name: 'Cutie Pie Transport LLC',
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: 'Order Completed - Cutie Pie Transport',
        text: `Dear ${fullName},\n\nWe are pleased to inform you that your order has been completed. You can review the final status and details of your order below.\n\nOrder ID: CPT-${trackingId}\n\nThank you for choosing Cutie Pie Transport LLC. We appreciate your business and look forward to serving you in the future. If you have any further questions or need assistance, please do not hesitate to contact us.\n\nBest of luck and best wishes,\nCutie Pie Transport LLC`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <header style="background-color: #f97316; padding: 10px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">Cutie Pie Transport</h2>
                </header>
                <section style="padding: 20px;">
                    <h3 style="color: #333;">Order Completed</h3>
                    <p>Dear ${fullName},</p>
                    <p>We are pleased to inform you that your order has been completed. You can review the final status and details of your order on our tracking page.</p>
                    <p><strong>Order ID:</strong></p>
                    <div style="text-align: center; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #f97316; font-size: 24px; margin: 0;">CPT-${trackingId}</h2>
                    </div>
                    <p>We appreciate your business and look forward to serving you in the future.</p>
                    <p>If you have any further questions or need assistance, please do not hesitate to contact us:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Phone:</strong> +1 (770) 572-5863</li>
                        <li><strong>Email:</strong> <a href="mailto:cutiepietransport@gmail.com">cutiepietransport@gmail.com</a></li>
                    </ul>
                    <p>Thank you for choosing Cutie Pie Transport LLC.</p>
                    <p>Best of luck and best wishes,</p>
                    <p>Cutie Pie Transport LLC</p>
                </section>
                <footer style="padding: 10px; border-radius: 0 0 8px 8px; background-color: #111827; text-align: center; color: #888;">
                    <p>This is an automated message, please do not reply.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(completedMailOptions);
};

const moveToCompletedOrders = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        order.status = 'Completed';
        await order.save();

        await sendOrderCompletedEmail(order);

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send("Failed to move order to completed. Try Again!");
    }
}

const getCustomerCheckpoints = async (req, res) => {
    const { trackingId } = req.params;

    try {
        const checkpoint = await Checkpoint.findOne({ trackingId });

        if (!checkpoint) {
            return res.status(404).json({ message: 'Tracking ID not found' });
        }

        res.status(200).json(checkpoint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getCustomerOrder = async (req, res) => {
    const { trackingId } = req.params;

    try {
        const order = await Order.findOne({ trackingId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the order details.' });
    }
}

const getCustomerPayment = async (req, res) => {
    const { trackingId } = req.params;

    try {
        const payment = await Payment.findOne({ trackingId });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }

        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the payment details.' });
    }
}

const getPayments = async (req, res) => {
    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ message: 'orderId query parameter is required' });
        }

        const payments = await Payment.find({ orderId });

        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this order' });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error fetching payments' });
    }
};

const changePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
        return res.status(400).json({ message: 'Payment status is required' });
    }

    try {
        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.paymentStatus = paymentStatus;
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Error updating payment status' });
    }
};

const addPaymentEmail = async (req, res) => {
    const { orderId, trackingId, contactInfo } = req.body;

    try {
        await Payment.updateOne(
            { orderId },
            { $set: { payerEmail: contactInfo } }
        );

        await Notification.create({
            orderId,
            trackingId,
            type: 'payment'
        });

        res.status(200).json({ message: 'Payment information updated and notification created' });
    } catch (error) {
        console.error('Error updating payment info:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
};

const squarePayment = async (req, res) => {
    const { paymentsApi } = new Client({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: 'production',
    });

    const { sourceId, orderId, trackingId, amount } = req.body;

    BigInt.prototype.toJSON = function() { return this.toString(); };

    try {
        const roundedAmount = Math.round(amount * 100);

        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId: sourceId,
            amountMoney: {
                currency: 'USD',
                amount: roundedAmount,
            },
            note: `Payment for order ${orderId}`,
        });

        if (result.payment && result.payment.status === 'COMPLETED') {
            await Payment.updateOne(
                { orderId },
                { $set: { paymentStatus: 'Paid' } }
            );

            await Notification.create({
                orderId,
                trackingId,
                type: 'payment'
            });
        }

        res.status(200).json(result);
    } catch (error) {
        // Extract the error details
        const errorMessage = error.response?.body?.errors?.[0]?.detail || 'Payment processing error';

        console.error('Error creating payment:', error.response ? error.response.body : error.message);

        // Respond with a specific error message
        res.status(error.response?.statusCode || 500).json({
            error: errorMessage,
            message: 'There was an error processing your payment. Please check the card details and try again.',
        });
    }
}

const acceptIpAgreement = async (req, res) => {
    try {
        const { signed, date, ip, ipData } = req.body;

        const newAgreement = new IpAgreement({
            signed,
            date,
            ip,
            ipData
        });

        await newAgreement.save();

        res.status(201).json({ message: "Agreement Accepted", agreement: newAgreement });
    } catch (error) {
        console.error("Error saving agreement:", error);
        res.status(500).json({ message: "Something went wrong. Try again later." });
    }
}

const getIpAgreement = async (req, res) => {
    try {
        const agreements = await IpAgreement.find();
        res.status(200).json(agreements);
    } catch (error) {
        console.error('Error fetching signed agreements:', error);
        res.status(500).json({ message: "Error fetching signed agreements" });
    }
}

module.exports = {
    CreateUser,
    adminLogin,
    sendMessage,
    placeOrder,
    getOrderRequests,
    getPendingOrders,
    getActiveOrders,
    getCompletedOrders,
    rejectOrder,
    acceptOrder,
    updateOrder,
    addCheckpoints,
    getCheckpoints,
    updateCheckpoints,
    moveToActiveOrders,
    moveToCompletedOrders,
    getCustomerCheckpoints,
    getCustomerOrder,
    getPayments,
    changePaymentStatus,
    getCustomerPayment,
    addPaymentEmail,
    getNotifications,
    deleteNotification,
    squarePayment,
    acceptIpAgreement,
    getIpAgreement
};

