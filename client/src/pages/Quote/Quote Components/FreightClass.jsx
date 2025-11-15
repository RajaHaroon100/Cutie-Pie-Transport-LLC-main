import React, { useState, useEffect } from 'react';
import FreightClassSVG from '../../../assets/SVGs/freight-class.svg';
import { FREIGHT_CLASS } from '../LTL Quote/data';
import HelpBox from './HelpBox';

 export default function FreightClass({ setAddedItems, onFreightClassChange }) {
    const [items, setItems] = useState([]);
    const [freightClasses, setFreightClasses] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isHelpBoxOpen, setIsHelpBoxOpen] = useState(false);

    const openHelpBox = () => setIsHelpBoxOpen(true);
    const closeHelpBox = () => setIsHelpBoxOpen(false);

    useEffect(() => {
        if (setAddedItems) {
            setItems(setAddedItems);
            const initialFreightClasses = setAddedItems.map(item => ({
                description: item.description,
                freightClass: calculateFreightClass(item).freightClass,
                nmfc: ""
            }));
            setFreightClasses(initialFreightClasses);
            onFreightClassChange(initialFreightClasses);
        }
    }, [setAddedItems]);

    const getFreightClass = (density) => {
        if (density >= 50) return 50;
        if (density >= 35) return 55;
        if (density >= 30) return 60;
        if (density >= 22.5) return 65;
        if (density >= 15) return 70;
        if (density >= 13.5) return 77.5;
        if (density >= 12) return 85;
        if (density >= 10.5) return 92.5;
        if (density >= 9) return 100;
        if (density >= 8) return 110;
        if (density >= 7) return 125;
        if (density >= 6) return 150;
        if (density >= 5) return 175;
        if (density >= 4) return 200;
        if (density >= 3) return 250;
        if (density >= 2) return 300;
        if (density >= 1) return 400;
        return 500;
    };

    const calculateFreightClass = (item) => {
        const itemVolumeInches = (item.length * item.width * item.height) * item.numPallets;
        const itemVolumeFeet = itemVolumeInches / 1728; // Convert cubic inches to cubic feet
        const itemDensity = item.weight / itemVolumeFeet; // lbs per cubic foot
        const itemFreightClass = getFreightClass(itemDensity);

        return {
            description: item.description,
            volume: itemVolumeFeet.toFixed(2),
            weight: item.weight.toFixed(2),
            density: itemDensity.toFixed(2),
            freightClass: itemFreightClass,
        };
    };

    const handleFreightClassChange = (index, newFreightClass) => {
        const updatedFreightClasses = [...freightClasses];
        updatedFreightClasses[index].freightClass = newFreightClass;
        setFreightClasses(updatedFreightClasses);
        onFreightClassChange(updatedFreightClasses);
    };

    const handleNMFCChange = (index, newNMFC) => {
        const updatedFreightClasses = [...freightClasses];
        updatedFreightClasses[index].nmfc = newNMFC;
        setFreightClasses(updatedFreightClasses);
        onFreightClassChange(updatedFreightClasses);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    return (
        <div className='font-sans flex justify-center px-4 sm:px-8 lg:px-0'>
            <div className='flex flex-col w-full sm:w-3/4 lg:w-2/3'>
                <div className='flex flex-col items-center mb-8'>
                    <img className='max-w-24 sm:max-w-36 mb-6' src={FreightClassSVG} alt="freight-class-svg" />
                    <h2 className='text-2xl sm:text-3xl text-heading_1 font-semibold text-center'>
                        We calculated your dimensional <span className='text-heading_2'>freight class</span>
                    </h2>
                    <p className="mt-2 text-base sm:text-lg text-subHeading_1 text-center">
                        We estimate this to be your freight class based on the weight and dimensions you provided.
                    </p>
                    <p onClick={(e) => { openHelpBox(); }} className='mt-4 text-sm sm:text-base font-semibold text-heading_2 cursor-pointer'>
                        What is a freight class?
                    </p>
                    <HelpBox isOpen={isHelpBoxOpen} onClose={closeHelpBox} helpbox={FREIGHT_CLASS.helpbox} svg={FREIGHT_CLASS.svg} title={FREIGHT_CLASS.title} />
                </div>
                <div className='mb-2'>
                    {items.map((item, index) => {
                        const freightInfo = calculateFreightClass(item);
                        return (
                            <div key={index} className='bg-bg w-full rounded-md shadow-md p-4 sm:p-6 mb-4'>
                                <div className='flex flex-col sm:flex-row items-center'>
                                    <div className='flex flex-col items-center text-heading_2 mb-4 sm:mb-0'>
                                        <p className='text-base'>Class</p>
                                        {!editMode ? (
                                            <p className='font-semibold text-2xl sm:text-3xl'>{freightClasses[index]?.freightClass}</p>
                                        ) : (
                                            <select
                                                value={freightClasses[index]?.freightClass}
                                                onChange={(e) => handleFreightClassChange(index, e.target.value)}
                                                className='w-full mt-2 px-3 py-2 border bg-white border-black hover:border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                                            >
                                                {[50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500].map(fc => (
                                                    <option key={fc} value={fc}>{fc}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                    <div className='flex text-base sm:ml-8'>
                                        <h3 className='font-semibold text-subHeading_1'>{freightInfo.description}</h3>
                                        <p className='text-text_1 ml-1'>
                                        - {item.numPallets + " "} 
                                        {(item.packaging.includes('Pallet')) ? "Pallets" : (item.packaging.includes('Box') ? 'Boxes' : item.packaging + "s")}, {item.weight} pounds, Estimated Class {freightInfo.freightClass}
                                        </p>
                                    </div>
                                </div>
                                {editMode && (
                                    <div className='mt-4'>
                                        <label htmlFor={`nmfc-${index}`} className='block text-sm font-medium text-gray-700'>
                                            NMFC# for {freightInfo.description} (optional)
                                        </label>
                                        <input
                                            type="text"
                                            id={`nmfc-${index}`}
                                            value={freightClasses[index]?.nmfc}
                                            onChange={(e) => handleNMFCChange(index, e.target.value)}
                                            className='w-full mt-2 px-3 py-2 border border-black hover:border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* <div>
                    {!editMode ? (
                        <button onClick={toggleEditMode} className='text-heading_2 mt-2 font-semibold hover:underline flex'>
                            Edit Freight Class
                        </button>
                    ) : (
                        <button onClick={handleSave} className='text-bg hover:text-secondary bg-secondary hover:bg-primary mt-2 py-2 px-8 rounded-lg font-semibold transition-colors'>
                            Save
                        </button>
                    )}
                </div> */}
            </div>
        </div>
    );
    
}
