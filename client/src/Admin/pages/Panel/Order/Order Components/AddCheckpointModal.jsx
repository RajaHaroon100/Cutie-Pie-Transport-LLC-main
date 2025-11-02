import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { FaTrash, FaPen } from 'react-icons/fa';
import debounce from 'lodash.debounce';

Modal.setAppElement('#root');

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

const AddCheckpointModal = ({ isOpen, onClose, onSave, pickupLocation, deliveryLocation, pickupCountry, deliveryCountry, existingCheckpoints = [], checkpointId }) => {
    const [checkpoints, setCheckpoints] = useState([]);
    const [newCheckpoint, setNewCheckpoint] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validCheckpoint, setValidCheckpoint] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const fetchSuggestions = useCallback(async (newAddress) => {
        if (newAddress.length > 1) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${newAddress}&countrycodes=us,ca&format=json&addressdetails=1&limit=5`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const suggestions = data.map(item => {
                    if (item.address) {
                        const city = item.address.city || item.address.town || item.address.village || '';
                        const postalCode = item.address.postcode || '';
                        const stateName = item.address.state || item.address.state_district || '';
                        const stateAbbreviation = stateAbbreviations[stateName] || stateName;

                        if (excludedLocations.includes(stateName) || excludedLocations.includes(city)) {
                            return null;
                        }

                        return city ? { 
                            city, 
                            postalCode, 
                            state: stateAbbreviation,
                        } : null;
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
    }, []);

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), [fetchSuggestions]);

    const handleChange = (event) => {
        const newAddress = event.target.value;
        setNewCheckpoint(newAddress);

        setLoading(true);
        setValidCheckpoint(false);
        debouncedFetchSuggestions(newAddress);
    };

    const handleSuggestionClick = (suggestion) => {
        const fullCheckpoint = suggestion.postalCode 
            ? `${suggestion.city}, ${suggestion.state}, ${suggestion.postalCode}` 
            : `${suggestion.city}, ${suggestion.state}`;
        
        setNewCheckpoint(fullCheckpoint);
        setValidCheckpoint(true);
        setSuggestions([]);
    };

    const handleAddCheckpoint = () => {
        if (newCheckpoint && validCheckpoint) {
            const checkpoint = { location: newCheckpoint, status: false };

            if (editingIndex !== null) {
                const updatedCheckpoints = [...checkpoints];
                updatedCheckpoints[editingIndex] = checkpoint;
                setCheckpoints(updatedCheckpoints);
                setEditingIndex(null);
            } else {
                setCheckpoints([...checkpoints, checkpoint]);
            }

            setNewCheckpoint('');
            setValidCheckpoint(false);
        }
    };

    const handleEditCheckpoint = (index) => {
        const checkpoint = checkpoints[index];
        setNewCheckpoint(checkpoint.location);
        setValidCheckpoint(true);
        setEditingIndex(index);
    };

    const handleRemoveCheckpoint = (index) => {
        setCheckpoints(checkpoints.filter((_, i) => i !== index));
    };

    const handleFinalize = () => {
        setNewCheckpoint('');
        setEditingIndex(null);
        onSave(checkpoints, checkpointId);
        onClose();
    };

    const handleClose = () => {
        setNewCheckpoint('');
        setEditingIndex(null);
        onClose();
    };

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    useEffect(() => {
        setCheckpoints(existingCheckpoints);
    }, [existingCheckpoints, pickupLocation, deliveryLocation]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={false}
            contentLabel="Add Checkpoints"
            className="w-11/12 max-w-lg mx-auto my-20 bg-white rounded-lg shadow-lg p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className='mb-8'>
                <h2 className="w-full text-xl font-bold">Add Checkpoints</h2>
                <p className='text-xs text-orange-900'>Add checkpoints starting from the pickup location as the origin point.</p>
            </div>

            <div className="mb-4">
                <p className='font-semibold text-gray-800'>{pickupLocation}, {pickupCountry} <span className='text-sm text-gray-500'>(Pickup Point)</span></p>
            </div>
            
            <div className="mb-2">
                <ul>
                    {checkpoints.map((cp, index) => (
                        <li key={index} className="flex items-center justify-between mb-1 hover:bg-gray-100 rounded-sm border p-2">
                            {index + 1}. {cp.location}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditCheckpoint(index)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaPen />
                                </button>
                                <button
                                    onClick={() => handleRemoveCheckpoint(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`flex ${(checkpoints.length === 4 && editingIndex === null) && "hidden"}`}>
                <input
                    type="text"
                    value={newCheckpoint}
                    onChange={handleChange}
                    className="w-full p-2 border-l border-t border-b border-gray-900 rounded-s-sm"
                    placeholder="Enter checkpoint location"
                />
                <button
                    onClick={handleAddCheckpoint}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-e-sm cursor-pointer"
                    disabled={(checkpoints.length >= 4 && editingIndex === null) || !newCheckpoint || !validCheckpoint}
                >
                    {editingIndex !== null ? 'Edit' : 'Add'}
                </button>
            </div>

            {loading && <p className="text-gray-500 mt-2">Searching...</p>}

            {suggestions.length > 0 && (
                <div className='relative w-full'>
                    <ul className="border border-gray-300 rounded-b-lg shadow-md absolute bg-gray-300 z-10 w-full">
                        {suggestions.map((suggestion, index) => (
                            <li 
                                key={index} 
                                onClick={() => handleSuggestionClick(suggestion)} 
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion.postalCode ? `${suggestion.city}, ${suggestion.state}, ${suggestion.postalCode}` : `${suggestion.city}, ${suggestion.state}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4 mb-8">
                <p className='font-semibold text-gray-800'>{deliveryLocation}, {deliveryCountry} <span className='text-sm text-gray-500'>(Delivery Point)</span></p>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={handleClose}
                    className="bg-gray-300 text-black w-full py-2 px-4 rounded-lg cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleFinalize}
                    className={`${(checkpoints.length === 0 || editingIndex != null) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-600'} text-white w-full py-2 px-4 rounded-lg`}
                    disabled={checkpoints.length === 0 || editingIndex != null}
                >
                    Finalize
                </button>
            </div>
        </Modal>
    );
};

export default AddCheckpointModal;

