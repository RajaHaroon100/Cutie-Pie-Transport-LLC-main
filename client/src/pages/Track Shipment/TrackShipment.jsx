import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Landing from '../../components/landing';
import TrackShipmentSVG from '../../assets/SVGs/track-shipment.svg';
import { toast } from 'react-hot-toast'

export default function TrackShipment() {
    const [trackingId, setTrackingId] = useState('');
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setTrackingId(value);
            setError('');

            if (value.length < 6) {
                setError('The Order ID must be 6 digits.');
            }
        }
    };

    useEffect(() => {
        setIsDisabled(trackingId.length !== 6 || !!error);
    }, [trackingId, error]);

    const handleTrackClick = async () => {
        try {
            setIsDisabled(true);
            const response = await axios.get(`/customer/order/${trackingId}`);
            const data = response.data;
            navigate('/tracking-details', { state: { data } });
        } catch (err) {
            toast.error('Order not found.');
            setTrackingId('');
            setError('No order found with this Order ID.');
        }
    }; 

    return (
    <>
        <Landing title='Track Shipment' />
        <div className='mx-4 sm:mx-12 lg:mx-36 bg-accent p-6 sm:p-8 my-8 lg:my-12 rounded-xl flex items-center justify-center font-sans'>
            <div className='flex flex-col items-center mb-8 w-full sm:w-2/3 text-center'>
                <img className='w-24 sm:w-32' src={TrackShipmentSVG} alt="track-shipment-svg" />
                <h2 className='text-2xl sm:text-3xl font-semibold mt-6 sm:mt-8 text-heading_1'>
                    Track Your <span className='text-heading_2'>Shipment</span>
                </h2>
                <p className='text-sm sm:text-base mt-2 text-subHeading_1'>
                    To monitor the progress of your shipment, please enter 
                    your Order ID below. This feature is available for 
                    all orders that have already been placed.
                </p>
                <div className='my-8 sm:my-12'>
                    <p className='text-left mb-2 text-heading_1 ml-2 text-sm sm:text-base'>Order ID</p>
                    <div className='flex flex-col sm:flex-row sm:space-x-4 text-heading_1'>
                        <div className='relative w-full sm:w-auto'>
                            <input 
                                type="text"
                                value={trackingId}
                                onChange={handleInputChange}
                                placeholder='000000'
                                className='w-full p-3 text-lg border border-black hover:border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                                style={{ paddingLeft: 'calc(3rem + 1rem)' }}
                            />
                            <label className='absolute left-3 top-1/2 transform -translate-y-1/2 text-xl font-semibold text-gray-500'>
                                CPT-
                            </label>
                        </div>
                        <button
                            className={`w-full sm:w-1/3 mt-4 sm:mt-0 py-2 px-4 ${isDisabled ? "bg-gray-400" : "bg-primary animated-button-orange"} text-text_1 rounded-lg`}
                            disabled={isDisabled}
                            onClick={handleTrackClick}
                        >
                            <span className='font-semibold'>Track</span>
                        </button>
                    </div>
                    {error && (
                        <p className='text-left text-sm text-red-600 mt-2 ml-2'>
                            {error}
                        </p>
                    )}
                </div>
                <p className='text-xs sm:text-sm text-text_1'>
                    If you do not have your Order ID, please check your 
                    email inbox for a message from 
                    <strong> 'transport.cutiepie@gmail.com' </strong> 
                    containing this information.
                </p>
                <p className='text-xs sm:text-sm mt-2 text-text_1'>
                    If you are unable to locate your Order ID, our support 
                    team is available to assist you.
                </p>
            </div>
        </div>
    </>
);

}
