import React, { useEffect, useState } from 'react';
import AdditionalServicesSVG from '../../../assets/SVGs/forklift.svg';
import { ADDITIONAL_SERVICES as FTLAdditionalServices } from '../FTL Quote/data';
import { ADDITIONAL_SERVICES as LTLAdditionalServices } from '../LTL Quote/data';
import { LOCATION_TYPE } from '../LTL Quote/data';
import QuoteComponentCard from './QuoteComponentCard';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

export default function AdditionalServices({ shippingLocationType, deliveryLocationType, quoteType, onAdditionalServicesChange, additionalServices }) {
    
    let ADDITIONAL_SERVICES;
    
    const [selectedServices, setSelectedServices] = useState([]);

    if (quoteType === 'FTL') ADDITIONAL_SERVICES = FTLAdditionalServices;
    if (quoteType === 'LTL') ADDITIONAL_SERVICES = LTLAdditionalServices;
    
    useEffect(() => {
        onAdditionalServicesChange(selectedServices);
    }, [selectedServices])

    useEffect(() => {
        if(additionalServices) setSelectedServices(additionalServices)
    }, [])

    useEffect(() => {
        if (shippingLocationType === 'Residential') {
            setSelectedServices((prevSelected) => {
                if (!prevSelected.includes('Residential Pickup')) {
                    return [...prevSelected, 'Residential Pickup'];
                }
                return prevSelected;
            });
        }
        if (deliveryLocationType === 'Residential') {
            setSelectedServices((prevSelected) => {
                if (!prevSelected.includes('Residential Delivery')) {
                    return [...prevSelected, 'Residential Delivery'];
                }
                return prevSelected;
            });
        }
    }, [selectedServices])

    const onCardClick = (service) => {
        setSelectedServices((prevSelected) => {
            if (prevSelected.includes(service)) {
                return prevSelected.filter((s) => s !== service);
            } else {
                return [...prevSelected, service];
            }
        });        
    };

    const shouldDisplayPickupService = (service) => {
        const shipLocationType = LOCATION_TYPE.find(type => 
            type.title === shippingLocationType
        );
        if (shipLocationType) {
            return shipLocationType.additional_services.pickup.includes(service.value);
        }
        return false;
    };

    const shouldDisplayDeliveryService = (service) => {
        const deliverLocationType = LOCATION_TYPE.find(type => 
            type.title === deliveryLocationType
        );
        if (deliverLocationType) {
            return deliverLocationType.additional_services.delivery.includes(service.value);
        }
        return false;
    };

    return (
        <div className="font-sans flex flex-col items-center pb-4 px-4 sm:px-6 lg:px-8">
            <div className='flex flex-col items-center w-full max-w-4xl'>
                <img className='w-32 mb-6' src={AdditionalServicesSVG} alt="additional-services-img" />
                <h1 className="text-2xl sm:text-3xl text-heading_1 font-semibold text-center">
                    Do you need any additional service?
                </h1>
                <p className="mt-2 text-sm sm:text-base text-subHeading_1 text-center">
                    For an accurate quote, please select any services needed for your shipment. 
                    If no additional services are needed, you may proceed.
                </p>
            </div>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
                {quoteType === "FTL" &&
                    ADDITIONAL_SERVICES.map((service, itr) => (
                        <QuoteComponentCard 
                            key={itr} 
                            {...service}
                            isSelected={selectedServices.includes(service.value)} 
                            onCardClick={() => onCardClick(service.value)} 
                        />
                    ))
                }
            </div>
    
            {quoteType === "LTL" &&
                <div className='w-full max-w-4xl'>
                    <div className='mb-8'>
                        <h2 className='font-semibold text-lg sm:text-xl text-subHeading_1'>
                            Services at the Pickup Location
                        </h2>
                        {ADDITIONAL_SERVICES.filter(shouldDisplayPickupService).length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 w-full">
                                {ADDITIONAL_SERVICES.filter(shouldDisplayPickupService).map((service, itr) => (
                                    <QuoteComponentCard 
                                        key={itr} 
                                        {...service}
                                        isSelected={selectedServices.includes(service.value)} 
                                        onCardClick={() => onCardClick(service.value)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className='text-sm text-text_1 text-center mt-2'>
                                No Additional Services Available at Pickup Location
                            </p>
                        )}
                    </div>
    
                    <div>
                        <h2 className='font-semibold text-lg sm:text-xl text-subHeading_1'>
                            Services at the Delivery Location
                        </h2>
                        {ADDITIONAL_SERVICES.filter(shouldDisplayDeliveryService).length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 w-full">
                                {ADDITIONAL_SERVICES.filter(shouldDisplayDeliveryService).map((service, itr) => (
                                    <QuoteComponentCard 
                                        key={itr} 
                                        {...service}
                                        isSelected={selectedServices.includes(service.value)} 
                                        onCardClick={() => onCardClick(service.value)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className='text-sm text-text_1 text-center mt-2'>
                                No Additional Services Available at Delivery Location
                            </p>
                        )}
                    </div>
                </div>
            }
    
            <div className='w-full max-w-4xl'>
                {selectedServices.includes('Driver Assist') && 
                    <div className='flex items-center justify-center text-red-600 mt-8'>
                        <FaExclamationCircle className='w-6 h-6 mr-2'/>
                        <p className='text-center text-sm sm:text-base w-2/3'>
                            Driver assist shipments require special care so we're unable to 
                            quote this online. Please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                            possible quote options.
                        </p>
                    </div>
                }
                {selectedServices.includes('Shipment is Worth More than $100,000') && 
                    <div className='flex items-center justify-center text-red-600 mt-8'>
                        <FaExclamationCircle className='w-6 h-6 mr-2'/>
                        <p className='text-center text-sm sm:text-base w-2/3'>
                            Shipment worth more than $100,000 require special care so we're unable to 
                            quote this online. Please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                            possible quote options.
                        </p>
                    </div>
                }
                {selectedServices.includes('Pickup/Delivery Appointment') && 
                    <div className='flex items-center justify-center text-red-600 mt-8'>
                        <FaExclamationCircle className='w-6 h-6 mr-2'/>
                        <p className='text-center text-sm sm:text-base w-2/3'>
                            For appointment, please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                            possible quote options.
                        </p>
                    </div>
                }
                {selectedServices.includes('Pickup Appointment') && 
                    <div className='flex items-center justify-center text-red-600 mt-8'>
                        <FaExclamationCircle className='w-6 h-6 mr-2'/>
                        <p className='text-center text-sm sm:text-base w-2/3'>
                            For pickup appointment, please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                            possible quote options.
                        </p>
                    </div>
                }
                {selectedServices.includes('Delivery Appointment') && 
                    <div className='flex items-center justify-center text-red-600 mt-8'>
                        <FaExclamationCircle className='w-6 h-6 mr-2'/>
                        <p className='text-center text-sm sm:text-base w-2/3'>
                            For delivery appointment, please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                            possible quote options.
                        </p>
                    </div>
                }
            </div>
        </div>
    );    
}
