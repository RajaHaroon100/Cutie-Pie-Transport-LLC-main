import React, { useEffect, useState } from 'react';
import RouteStartSVG from '../../../assets/SVGs/route-start.svg';
import RouteEndSVG from '../../../assets/SVGs/route-end.svg';
import FlagUSSVG from '../../../assets/SVGs/flag-us.svg';
import FlagCASVG from '../../../assets/SVGs/flag-ca.svg';
import Address from './Address';
import AdditionalLocationTypes from './Additional Location Types/AdditionalLocationTypes';
import LocationType from './LocationType';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router-dom';

 export default function ShippingFrom({ quoteType, selectorType, selectedShippingCountry, shippingAddress, additionalShippingLocations, setLocationType, onCountryChange, onAddressChange, onAdditionalLocationsChange, onLocationTypeChange, onCoordinatesChange }) {
    const [selectedCountry, setSelectedCountry] = useState('United States');
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [additionalLocations, setAdditionalLocations] = useState([]);
    const [selectedLocationType, setSelectedLocationType] = useState("");

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedCountry(value);
        onCountryChange(value);
        onAddressChange('');
        setAddress('');
    };

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
        onAddressChange(newAddress);
    };

    const handleCoordinatesChange = (newCoordinates) => {
        setCoordinates(newCoordinates);
        onCoordinatesChange(newCoordinates);
    };    

    const handleAdditionalLocationsChange = (locations) => {
        setAdditionalLocations(locations);
        onAdditionalLocationsChange(locations);
    };

    const handleLocationTypeChange = (type) => {
        setSelectedLocationType(type);
        onLocationTypeChange(type);
    }

    useEffect(() => {
        if (selectedShippingCountry) setSelectedCountry(selectedShippingCountry)
    }, [selectedShippingCountry]);

    useEffect(() => {
        if(shippingAddress) setAddress(shippingAddress)
    }, [shippingAddress]);

    useEffect(() => {
        if (additionalShippingLocations) setAdditionalLocations(additionalShippingLocations)
    }, [additionalShippingLocations]);

    useEffect(() => {
        if (setLocationType) setSelectedLocationType(setLocationType)
    }, [setLocationType])

    return (
        <div className='font-sans flex justify-center'>
            <div className='flex flex-col w-full sm:w-3/4'>
                <div className='flex flex-col items-center'>
                    {selectorType === "pickup" ? (
                        <img className='w-24 sm:w-32 mb-6' src={RouteStartSVG} alt="route-start-svg" />
                    ) : (
                        <img className='w-24 sm:w-32 mb-6' src={RouteEndSVG} alt="route-end-svg" />
                    )}
                    
                    <h2 className='text-2xl sm:text-3xl text-heading_1 font-semibold text-center'>
                        Where are you  
                        <span className='text-heading_2'>
                            {selectorType === "pickup" && " shipping from"}
                            {selectorType === "delivery" && " shipping to"}
                        </span>?
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-subHeading_1 text-center">
                        <span className="text-red-500 text-xl">*</span> Indicates a required field
                    </p>
                </div>
    
                <div className='mx-4 my-8 sm:mx-8'>
                    <p className='text-sm sm:text-base text-subHeading_1'>
                        Country <span className="text-red-500 text-xl">*</span>
                    </p>
                    <div className='mt-2 text-heading_1'>
                        <input 
                            name='country' 
                            type='radio' 
                            value='United States' 
                            checked={selectedCountry === 'United States'}
                            onChange={handleRadioChange}
                            className='hidden'
                            id='unitedStates'
                        />
                        <label htmlFor='unitedStates' className='inline-flex items-center cursor-pointer'>
                            <span className='w-4 h-4 border border-primary rounded-full flex-shrink-0 mr-2 flex items-center justify-center'>
                                {selectedCountry === 'United States' && <span className='w-4 h-4 bg-primary rounded-full'></span>}
                            </span>
                            <img className='w-8 h-6 pr-2' src={FlagUSSVG} alt="united-states-flag" />
                            <p>
                                I'm shipping <span>
                                {selectorType === "pickup" && " from "}
                                {selectorType === "delivery" && " to "}
                                </span> the United States
                            </p>
                        </label>
                    </div>
                    <div className='mt-2 text-heading_1'>
                        <input 
                            name='country' 
                            type='radio' 
                            value='Canada' 
                            checked={selectedCountry === 'Canada'}
                            onChange={handleRadioChange}
                            className='hidden'
                            id='canada'
                        />
                        <label htmlFor='canada' className='inline-flex items-center cursor-pointer'>
                            <span className='w-4 h-4 border border-primary rounded-full flex-shrink-0 mr-2 flex items-center justify-center'>
                                {selectedCountry === 'Canada' && <span className='w-4 h-4 bg-primary rounded-full'></span>}
                            </span>
                            <img className='w-8 h-6 pr-2' src={FlagCASVG} alt="canada-flag" />
                            <p>
                                I'm shipping <span>
                                {selectorType === "pickup" && " from "}
                                {selectorType === "delivery" && " to "}
                                </span> Canada
                            </p>
                        </label>
                    </div>
                </div>
    
                <div>
                    <Address 
                        country={selectedCountry} 
                        shippingAddress={shippingAddress} 
                        onAddressChange={handleAddressChange} 
                        onCoordinatesChange={handleCoordinatesChange}
                    />
                    {quoteType === "LTL" && (
                        <LocationType setLocationType={setLocationType} onLocationTypeChange={handleLocationTypeChange}/>
                    )}
                    
                    {!(selectedLocationType === "Carrier Terminal" || selectedLocationType === "Drop off at a carrier terminal") && (
                        <AdditionalLocationTypes additionalShippingLocations={additionalShippingLocations} onAdditionalLocationsChange={handleAdditionalLocationsChange} />
                    )}
                </div>
                {/* Uncomment if needed
                {selectedCountry === 'Canada' && (
                    <div className="flex justify-center text-red-600 mt-8 mb-4">
                        <FaExclamation className="max-h-6 min-h-6 mr-2"/>
                        <p className='text-center'>
                            Canada online quotes coming soon! For now, talk with one of our shipping 
                            experts for quotes to/from Canada. Visit <Link to="/contactUS" className='underline hover:text-text_1'>
                            Contact Us</Link> page.
                        </p>
                    </div>
                )}
                */}
            </div>
        </div>
    );
    
}
