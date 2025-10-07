import React, { useEffect, useState } from 'react';
import { LOCATION_TYPES } from './data';

export default function AdditionalLocationTypes({ onAdditionalLocationsChange, additionalShippingLocations }) {
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleCheckboxChange = (type) => {
        let newSelectedLocations = [...selectedLocations];

        if (newSelectedLocations.includes(type)) {
            newSelectedLocations = newSelectedLocations.filter((item) => item !== type);
        } else {
            if (type === "No Dock / Tight Space") {
                newSelectedLocations.push(type);
            } else {
                if (newSelectedLocations.includes("No Dock / Tight Space")) {
                    newSelectedLocations = ["No Dock / Tight Space", type];
                } else {
                    newSelectedLocations = [type];
                }
            }
        }

        setSelectedLocations(newSelectedLocations);
        onAdditionalLocationsChange(newSelectedLocations);
    };

    useEffect(() => {
        if (additionalShippingLocations) {
            setSelectedLocations(additionalShippingLocations);
        }
    }, [additionalShippingLocations]);

    return (
    <div className="my-8 font-sans px-4 sm:px-8">
        <p className="text-text_1 font-semibold mb-2 text-base sm:text-lg">
            Does this location match any of these additional types? (optional)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCATION_TYPES.map((type, index) => (
                <label key={index} className="flex items-center cursor-pointer text-text_1">
                    <input
                        type="checkbox"
                        className='w-5 h-5 min-w-5 appearance-none bg-accent text-primary border border-primary rounded-sm checked:bg-primary focus:outline-none focus:ring-primary focus:ring-1'
                        checked={selectedLocations.includes(type.title)}
                        onChange={() => handleCheckboxChange(type.title)}
                    />
                    <img className='ml-2 mr-2' src={type.img} alt="location-img" />
                    <span className="text-sm sm:text-base">{type.title}</span>
                </label>
            ))}
        </div>
    </div>
);

}
