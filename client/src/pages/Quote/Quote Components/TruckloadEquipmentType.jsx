import { useState, useEffect } from "react";
import { EQUIPMENT_TYPE as FTLEquipmentType } from "../FTL Quote/data";
import { EQUIPMENT_TYPE as LTLEquipmentType } from "../LTL Quote/data";
import QuoteComponentCard from "./QuoteComponentCard";
import { FaExclamation, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TruckloadEquipmentType({ quoteType, selectedEquipment, onCardClick, onTemperatureChange, temperature, tarpSelection, onTarpChange }) {
    let EQUIPMENT_TYPE;

    if (quoteType === "FTL") EQUIPMENT_TYPE = FTLEquipmentType;
    if (quoteType === "LTL") EQUIPMENT_TYPE = LTLEquipmentType;

    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [tempError, setTempError] = useState('');

    const handleMinTempChange = (e) => {
        const value = e.target.value;
        setMinTemp(value);
        validateTemperature(value, maxTemp);
    };

    const handleMaxTempChange = (e) => {
        const value = e.target.value;
        setMaxTemp(value);
        validateTemperature(minTemp, value);
    };

    const validateTemperature = (min, max) => {
        const minTempValue = parseFloat(min);
        const maxTempValue = parseFloat(max);

        if (
            minTempValue < -20 || minTempValue > 85 ||
            maxTempValue < -20 || maxTempValue > 85
        ) {
            setTempError('Temperature must be between -20°F and 85°F.');
        } else if (maxTempValue < minTempValue) {
            setTempError("Minimum temperature can't be higher than maximum temperature.");
        } else {
            setTempError('');
        }
    };

    useEffect(() => {
        if (temperature.maxTemp && temperature.minTemp) {
            setMaxTemp(temperature.maxTemp);
            setMinTemp(temperature.minTemp);
        }
    }, [temperature.maxTemp, temperature.minTemp]);

    useEffect(() => {
        if (selectedEquipment !== 'Temperature Controlled') {
            setMinTemp('');
            setMaxTemp('');
            setTempError('');
        }
        onTemperatureChange({ minTemp: minTemp, maxTemp: maxTemp, tempError: tempError });
    }, [selectedEquipment, minTemp, maxTemp]);

    const handleTarpChange = (e) => {
        onTarpChange(e.target.value);
    };

    return (
        <div className="font-sans flex justify-center px-4 sm:px-6 md:px-8">
            <div className="flex flex-col w-full sm:w-3/4">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl text-heading_1 font-semibold">
                        What equipment type do you need?
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-subHeading_1">
                        <span className="text-red-500 text-xl">*</span> Indicates a required field
                    </p>
                </div>
                <div className="mt-6 sm:mt-8">
                    <p className="text-subHeading_1 font-semibold">
                        Truckload Equipment Type <span className="text-red-500 text-xl">*</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2 w-full">
                        {EQUIPMENT_TYPE.map((type, itr) => (
                            <QuoteComponentCard
                                key={itr}
                                {...type}
                                isSelected={selectedEquipment === type.value}
                                onCardClick={onCardClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="pt-8 sm:pt-12">
                    {selectedEquipment === 'Temperature Controlled' && (
                        <>
                            <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 justify-center">
                                <div className="w-full flex flex-col mb-2">
                                    <label
                                        className={`block mb-2 text-sm sm:text-base font-semibold ${tempError ? 'text-red-600' : 'text-text_1'}`}
                                    >
                                        Minimum temperature
                                        <span className="text-red-500 text-xl ml-1">*</span>
                                        <span className="ml-2 text-xs sm:text-sm font-normal">in °F</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={minTemp}
                                        onChange={handleMinTempChange}
                                        required
                                        className={`border no-arrows ${tempError ? 'border-red-600 focus:ring-red-600' : 'border-black focus:ring-primary'} p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-transparent`}
                                    />
                                </div>
                                <div className="w-full flex flex-col mb-2">
                                    <label
                                        className={`block mb-2 text-sm sm:text-base font-semibold ${tempError ? 'text-red-600' : 'text-text_1'}`}
                                    >
                                        Maximum temperature
                                        <span className="text-red-500 text-xl ml-1">*</span>
                                        <span className="ml-2 text-xs sm:text-sm font-normal">in °F</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={maxTemp}
                                        onChange={handleMaxTempChange}
                                        required
                                        className={`border no-arrows ${tempError ? 'border-red-600 focus:ring-red-600' : 'border-black focus:ring-primary'} p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                            {tempError && (
                                <div className="flex items-center justify-center text-red-600 mt-2">
                                    <FaExclamation className="max-w-2 mr-2" />
                                    <p>{tempError}</p>
                                </div>
                            )}
                        </>
                    )}
                    {selectedEquipment === 'Flatbed' && (
                        <div className="mt-4 flex flex-col items-center">
                            <label className="block mb-2 text-sm sm:text-base font-semibold text-text_1">
                                Tarps <span className="text-red-500 text-xl ml-1">*</span>
                            </label>
                            <select
                                value={tarpSelection}
                                onChange={handleTarpChange}
                                required
                                className="border border-blue-500 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-text_1"
                            >
                                <option value="No Tarp Required">No Tarp Required</option>
                                <option value="4 ft">4 ft</option>
                                <option value="6 ft">6 ft</option>
                                <option value="8 ft">8 ft</option>
                            </select>
                        </div>
                    )}
                    {selectedEquipment === 'Small Parcel' && (
                        <div className="flex items-center justify-center text-red-600 mt-4 sm:mt-2">
                            <FaExclamationCircle />
                            <p className="w-4/5 ml-2 text-center text-sm sm:text-base">
                                For small parcel shipment, please{' '}
                                <Link to="/contactUs">
                                    <span className="underline hover:text-text_1">Contact Us</span>
                                </Link>{' '}
                                for possible quote options.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
