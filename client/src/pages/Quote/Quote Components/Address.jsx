import React, { useState, useEffect, useRef, useCallback } from 'react';
import WarehouseSVG from '../../../assets/SVGs/warehouse.svg';

// Mapping of state names to abbreviations
const stateAbbreviations = {
    // US State Abbreviations
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
    "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
    "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
    "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
    "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
    "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
    "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
    "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
    // Canadian Province Abbreviations
    "Alberta": "AB", "British Columbia": "BC", "Manitoba": "MB", "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL", "Northwest Territories": "NT", "Nova Scotia": "NS",
    "Nunavut": "NU", "Ontario": "ON", "Prince Edward Island": "PE", "Quebec": "QC", "Saskatchewan": "SK",
    "Yukon": "YT"
};

const excludedLocations = [
    // US Territories and Islands
    "American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "U.S. Virgin Islands",
    // Alaska's remote locations
    "Alaska", // While parts of Alaska are connected by road, many remote areas are not
    // Canadian Territories and Islands
    "Newfoundland and Labrador", // Includes remote areas and islands
    "Nunavut", "Northwest Territories", "Yukon", // Remote areas within these territories
    // Canadian Islands
    "Prince Edward Island", // Connected by bridge but can be considered isolated
    "Nova Scotia", // Some remote areas and islands within
    "Newfoundland and Labrador", // Includes remote areas and islands

    // Specific Islands
    "Hawaii" // Note that Hawaii is a U.S. state but isolated geographically
];


export default function Address({ country, onAddressChange, shippingAddress, onCoordinatesChange }) {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [suggestions, setSuggestions] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const [countryCode, setCountryCode] = useState('us');
    const containerRef = useRef(null);

    useEffect(() => {
        if (country === "United States") {
            setCountryCode('us');
        } else if (country === "Canada") {
            setCountryCode('ca');
        }
    }, [country]);

    const fetchSuggestions = useCallback(async (newAddress) => {
        if (newAddress.length > 1) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${newAddress}&countrycodes=${countryCode}&format=json&addressdetails=1&limit=5`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const suggestions = data.map(item => {
                    if (item.address) {
                        const city = item.address.city || item.address.town || item.address.village || item.address.hamlet || item.address.suburb || '';
                        const county = item.address.county || ''; 
                        const postalCode = item.address.postcode || '';
                        const stateName = item.address.state || item.address.state_district || '';
                        const stateAbbreviation = stateAbbreviations[stateName] || stateName;

                        if (excludedLocations.includes(stateName) || excludedLocations.includes(city)) {
                            return null;
                        }

                        const displayName = city ? `${city}` : county ? `${county}` : '';
                        if (displayName) {
                            return {
                                city: displayName,
                                postalCode,
                                state: stateAbbreviation,
                                latitude: item.lat,
                                longitude: item.lon
                            };
                        }
                    }
                    return null;
                }).filter(item => item !== null);

                setSuggestions(suggestions);
            } catch (error) {
                console.error("Error fetching city suggestions:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
            setLoading(false);
        }
    }, [countryCode]);


    const handleChange = (event) => {
        const newAddress = event.target.value;
        setAddress(newAddress);
        setValidInput(false);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setLoading(true);

        const newTimeoutId = setTimeout(() => {
            fetchSuggestions(newAddress);
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    const handleSuggestionClick = (city, postalCode, state, latitude, longitude) => {
        const fullAddress = postalCode ? `${city}, ${state}, ${postalCode}` : `${city}, ${state}`;
        setAddress(fullAddress);
        setSuggestions([]);
        setValidInput(true);

        const newCoordinates = { latitude, longitude };
        setCoordinates(newCoordinates);
        onAddressChange(fullAddress);
        onCoordinatesChange(newCoordinates);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                if (!validInput) {
                    setAddress('');
                    onAddressChange('');
                }
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [validInput, onAddressChange, timeoutId]);

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress);
            setValidInput(true);
        }
        if (shippingAddress === '') {
            setAddress('');
        }
    }, [shippingAddress]);

    return (
        <div className="font-sans relative px-4 sm:px-6 lg:px-8">
            <p className='text-text_1 mb-2 text-base sm:text-lg'>
                City or postal code <span className="text-red-500 text-xl">*</span>
            </p>
            <input
                type="text"
                value={address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-black hover:border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {loading && (
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Searching...</p>
            )}
            {suggestions.length > 0 && (
                <div className='relative w-full'>
                    <ul className="border border-gray-300 rounded-lg shadow-md mt-1 absolute w-full bg-white z-10 max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(
                                    suggestion.city,
                                    suggestion.postalCode,
                                    suggestion.state,
                                    suggestion.latitude,
                                    suggestion.longitude
                                )}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm sm:text-base"
                            >
                                {suggestion.postalCode ? `${suggestion.city}, ${suggestion.state}, ${suggestion.postalCode}` : `${suggestion.city}, ${suggestion.state}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-4 flex items-center">
                <img className='w-8 h-8 sm:w-10 sm:h-10 sm:mr-0 md:mr-2 hidden md:block' src={WarehouseSVG} alt="Warehouse icon" />
                <p className="text-gray-700 text-sm sm:text-base">
                    Truckload pickup location must be a business with a loading dock or
                    have a way to load the truck.
                </p>
            </div>
        </div>
    );

}
