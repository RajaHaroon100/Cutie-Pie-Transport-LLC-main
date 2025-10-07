import { useEffect, useState } from "react";
import { LOCATION_TYPE } from "../LTL Quote/data"
import QuoteComponentCard from "./QuoteComponentCard";
import { FaExclamation } from "react-icons/fa";

export default function LocationType({ onLocationTypeChange, setLocationType }) {
    const [selectedLocationType, setSelectedLocationType] = useState("");

    const onCardClick = (type) => {
        setSelectedLocationType(type);       
    };

    useEffect(() => {
        onLocationTypeChange(selectedLocationType)
    }, [selectedLocationType])

    useEffect(() => {
        if (setLocationType) setSelectedLocationType(setLocationType)
    }, [setLocationType])

    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <h3 className="text-subHeading_1 font-semibold text-lg sm:text-xl">
                Type of Location <span className="text-red-500 text-xl">*</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {LOCATION_TYPE.map((type, itr) => (
                    <QuoteComponentCard 
                        key={itr} 
                        {...type}
                        isSelected={selectedLocationType.includes(type.value)} 
                        onCardClick={() => onCardClick(type.value)} 
                    />
                ))}
            </div>
            {selectedLocationType !== 'Carrier Terminal' && 
                <div className='flex items-center justify-center mt-8 text-amber-800 space-x-2'>
                    <FaExclamation className='h-5 w-5'/>
                    <p className='text-sm sm:text-base text-center'>
                        If you don't have a loading dock, please select "No Dock / Tight Space" below.
                    </p>
                </div>
            }
        </div>
    );    
}