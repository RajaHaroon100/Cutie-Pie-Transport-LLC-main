import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { TERMS } from './terms'; // Import the terms

import AOS from 'aos';
import 'aos/dist/aos.css';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const LoadingModal = ({ isOpen }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={() => {}}
        shouldCloseOnOverlayClick={false}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
                color: '#111827',
                background: '#f97316',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                padding: '2rem',
                fontSize: '16px',
                borderRadius: '12px',
            }
        }}
    >
        <h2>Sending Message...</h2>
    </Modal>
);

const TermsModal = ({ isOpen, onClose }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
                color: '#111827',
                background: '#fed7aa',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -40%)',
                textAlign: 'left',
                padding: '2rem',
                fontSize: '16px',
                borderRadius: '12px',
                maxHeight: 'calc(100vh - 40%)', // Limit the maximum height
                overflowY: 'auto', // Enable vertical scrolling
                width: '90%', // Set a fixed width
                maxWidth: '800px', // Limit the maximum width
            }
        }}
    >
        <div dangerouslySetInnerHTML={{ __html: TERMS }} />
        <button onClick={onClose} className="w-full py-3 mt-4 font-semibold rounded bg-primary hover:bg-secondary text-secondary hover:text-accent">Close</button>
    </Modal>
);

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
        agree: false,
    });

    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadingModalOpen(true);
        try {
            const response = await axios.post('/sendMessage', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Include credentials (cookies) in the request
            });

            const data = response.data;
            if (response.status === 200) {
                toast.success(data.message);
                setFormData({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    message: '',
                    agree: false,
                });
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while sending the message.');
        } finally {
            setIsLoadingModalOpen(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="p-6 mx-4 mt-12 font-sans border-b-4 rounded-lg shadow-md sm:mx-12 lg:mx-36 sm:p-8 lg:p-12 border-primary bg-[#CD5360]" data-aos="fade-up">
            <div className='flex flex-col items-center' data-aos="fade-up">
                <h1 className="mb-4 text-3xl font-bold text-center sm:text-4xl text-heading_1">Tell us what you're looking for</h1>
                <p className="mb-8 text-lg sm:text-xl text-subHeading_1">Send us a message</p>
            </div>
            <form onSubmit={handleSubmit} data-aos="fade-up">
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2 font-bold text-subHeading_1">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2 font-bold text-subHeading_1">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-2 font-bold text-subHeading_1">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold text-subHeading_1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block mb-2 font-bold text-subHeading_1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="w-5 h-5 form-checkbox"
                        required
                    />
                    <label className="ml-2 font-semibold text-subHeading_1">
                        I agree to the <span
                            className="font-semibold text-blue-600 underline cursor-pointer"
                            onClick={() => setIsTermsModalOpen(true)}
                        >
                            terms and conditions
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="px-8 py-4 font-semibold rounded-lg shadow-md animated-button-orange bg-primary"
                >
                    <span>Send Message</span>
                </button>
            </form>
            <LoadingModal isOpen={isLoadingModalOpen} />
            <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
        </div>
    );
}

