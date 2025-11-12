import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../Quote Components/Progress Bar/ProgressBar';
import NavigationButtons from '../Quote Components/NavigationButtons';
import '../../../components/Essentials/Loading/Loading.css';

const TruckloadEquipmentType = lazy(() => import('../Quote Components/TruckloadEquipmentType'));
const ShippingFrom = lazy(() => import('../Quote Components/LocationSelector'));
const DatePicker = lazy(() => import('../Quote Components/DateSelector'));
const ShippingTo = lazy(() => import('../Quote Components/LocationSelector'));
const AdditionalServices = lazy(() => import('../Quote Components/AdditionalServices'));
const AddItems = lazy(() => import('../Quote Components/AddItems'));
import Extras from '../Quote Components/Extras';

export default function FTLQuoteForm() {
    const quoteType = 'FTL';
    const navigate = useNavigate();

    const TRAILER_CONFIG = {
        quoteType,
        length: 632, // in inches
        width: 101,  // in inches
        height: 110, // in inches
        maxWeight: 45000, // in pounds
    };
    
    const [currentStep, setCurrentStep] = useState(1);
    const [currentSubStep, setCurrentSubStep] = useState(1);

    const [selectedEquipment, setSelectedEquipment] = useState("Dry van");
    const [temperature, setTemperature] = useState({ minTemp: null, maxTemp: null, tempError: null });
    const [tarpSelection, setTarpSelection] = useState("No Tarp Required"); // Added tarpSelection state

    const [selectedShippingCountry, setSelectedShippingCountry] = useState("United States");
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCoordinates, setShippingCoordinates] = useState({ latitude: null, longitude: null });
    const [additionalShippingLocations, setAdditionalShippingLocations] = useState([]);

    const [selectedDeliveryCountry, setSelectedDeliveryCountry] = useState("United States");
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryCoordinates, setDeliveryCoordinates] = useState({ latitude: null, longitude: null });
    const [additionalDeliveryLocations, setAdditionalDeliveryLocations] = useState([]);

    const [pickupDate, setPickupDate] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);

    const [additionalServices, setAdditionalServices] = useState([]);

    const [items, setItems] = useState([]);
    const [availableVolume, setAvailableVolume] = useState(null);
    const [availableWeight, setAvailableWeight] = useState(null);

    const [containAlcohol, setContainAlcohol] = useState("no");
    const [disableButton, setDisableButton] = useState(false);

    const stepConfig = {
        1: 1,
        2: 2,
        3: 2,
        4: 1,
        5: 1,
    };

    const totalSteps = Object.keys(stepConfig).length;

    useEffect(() => {
        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });
    }, [currentStep, currentSubStep]);

    const handleCardClick = (value) => {
        setSelectedEquipment(value);
    };

    const handleTemperatureChange = ({ minTemp, maxTemp, tempError }) => {
        setTemperature({ minTemp, maxTemp, tempError });
    };

    const handleTarpChange = (value) => { // Added handleTarpChange
        setTarpSelection(value);
    };

    const handleNext = () => {
        if (currentSubStep < stepConfig[currentStep]) {
            setCurrentSubStep(currentSubStep + 1);
        } else if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setCurrentSubStep(1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentSubStep > 1) {
            setCurrentSubStep(currentSubStep - 1);
        } else if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setCurrentSubStep(stepConfig[currentStep - 1]);
        }
    };

    const handleFinish = () => {
        const formData = {
            quoteType,
            selectedEquipment,
            temperature,
            tarpSelection, // Added to formData
            selectedShippingCountry,
            shippingAddress,
            shippingCoordinates,
            additionalShippingLocations,
            selectedDeliveryCountry,
            deliveryAddress,
            deliveryCoordinates,
            additionalDeliveryLocations,
            pickupDate,
            deliveryDate,
            additionalServices,
            items,
            availableVolume,
            availableWeight,
            TRAILER_CONFIG,
        };

        navigate('/quoteCalculation', { state: formData });
    };

    const handleCountryChange = (country) => {
        if (currentStep === 2)
            setSelectedShippingCountry(country);
        else if (currentStep === 3)
            setSelectedDeliveryCountry(country);
    };

    const handleAddressChange = (newAddress) => {
        if (currentStep === 2)
            setShippingAddress(newAddress);
        else if (currentStep === 3)
            setDeliveryAddress(newAddress);
    };

    const handleCoordinatesChange = (newCoordinates) => {
        if (currentStep === 2)
            setShippingCoordinates(newCoordinates);
        else if (currentStep === 3)
            setDeliveryCoordinates(newCoordinates);
    };

    const handleAdditionalLocationsChange = (locations) => {
        if (currentStep === 2)
            setAdditionalShippingLocations(locations);
        else if (currentStep === 3)
            setAdditionalDeliveryLocations(locations);
    };

    const handleDateChange = (date) => {
        if (currentStep === 2)
            setPickupDate(date);
        else if (currentStep === 3)
            setDeliveryDate(date);
    };

    const handleAdditionalServicesChange = (services) => {
        setAdditionalServices(services);
    };

    const handleItemsChange = (items) => {
        setItems(items);
    };

    const handleVolumeChange = (volume) => {
        setAvailableVolume(volume);
    };

    const handleWeightChange = (weight) => {
        setAvailableWeight(weight);
    };

    const handleContainAlcohol = (contain) => {
        setContainAlcohol(contain);
    };

    const handleDisableButton = (disable) => {
        setDisableButton(disable);
    };

    const isNextDisabled = () => {
        console.log("isNextDisabled check - selectedEquipment:", selectedEquipment, "tarpSelection:", tarpSelection); // Debug log
        if (currentStep === 1) {
            if (!selectedEquipment) return true;
            if (selectedEquipment === 'Temperature Controlled' && 
                (temperature.minTemp === "" || temperature.maxTemp === "" || temperature.tempError !== "")) {
                return true;
            }
            if (selectedEquipment === 'Flatbed' && (!tarpSelection || tarpSelection === "No Tarp Required")) { // Updated condition
                return true;
            }
        }

        if (currentStep === 2 && currentSubStep === 1) {
            if (shippingAddress === "") return true;
            if (selectedShippingCountry === "") return true;
        }
        if (currentStep === 2 && currentSubStep === 2) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
        
            const dateComp = new Date(pickupDate);
            dateComp.setHours(0, 0, 0, 0);
        
            if (dateComp.getTime() === currentDate.getTime()) {
                return true;
            }
        }

        if (currentStep === 3 && currentSubStep === 1) {
            if (deliveryAddress === "") return true;
            if (selectedDeliveryCountry === "") return true;
        }
        if (currentStep === 3 && currentSubStep === 2) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
        
            const dateComp = new Date(deliveryDate);
            dateComp.setHours(0, 0, 0, 0);
        
            if (dateComp.getTime() === currentDate.getTime()) {
                return true;
            }
        }
        if (currentStep === 4) {
            if (additionalServices.includes('Shipment is Worth More than $100,000') ||
                additionalServices.includes('Driver Assist') ||
                additionalServices.includes('Pickup/Delivery Appointment')) {
                return true;
            }
        }
        if (currentStep === 5) {
            if (items.length === 0) return true;
            if (disableButton === true) return true;
        }
        
        return false;
    };

    return (
        <div className='w-full mx-4 sm:mx-8 md:mx-16 lg:mx-36'>
            <div className="container mb-8 sm:mb-12">
                <ProgressBar 
                    currentStep={currentStep}
                    currentSubStep={currentSubStep}
                    totalSteps={totalSteps}
                    totalSubSteps={stepConfig[currentStep]}
                    stepConfig={stepConfig}
                />
            </div>
    
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-screen bg-bg">
                    <div className="inline-block w-16 h-16 sm:w-24 sm:h-24 border-4 rounded-full spinner-border animate-spin" role="status"></div>
                    <span className="mt-4 sm:mt-8">Please Wait...</span>
                </div>
            }> 
                {currentStep === 1 && (
                    <div className='p-4 py-6 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <TruckloadEquipmentType 
                            quoteType={quoteType}
                            selectedEquipment={selectedEquipment} 
                            onCardClick={handleCardClick}
                            onTemperatureChange={handleTemperatureChange}
                            temperature={temperature}
                            tarpSelection={tarpSelection} // Added prop
                            onTarpChange={handleTarpChange} // Added prop
                        />
                    </div>
                )}
                {currentStep === 2 && (
                    currentSubStep === 1 ? (
                        <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                            <ShippingFrom 
                                quoteType={quoteType}
                                selectorType="pickup"
                                selectedShippingCountry={selectedShippingCountry}
                                shippingAddress={shippingAddress}
                                additionalShippingLocations={additionalShippingLocations}
                                onCountryChange={handleCountryChange}
                                onAddressChange={handleAddressChange}
                                onCoordinatesChange={handleCoordinatesChange}
                                onAdditionalLocationsChange={handleAdditionalLocationsChange}
                            />
                        </div>
                    ) : (
                        <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                            <DatePicker
                                selectorType="pickup"
                                onDateChange={handleDateChange}
                                setDate={pickupDate}
                            />
                        </div>
                    )
                )}
                {currentStep === 3 && (
                    currentSubStep === 1 ? (
                        <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                            <ShippingTo
                                quoteType={quoteType}
                                selectorType="delivery"
                                selectedShippingCountry={selectedDeliveryCountry}
                                shippingAddress={deliveryAddress}
                                additionalShippingLocations={additionalDeliveryLocations}
                                onCountryChange={handleCountryChange}
                                onAddressChange={handleAddressChange}
                                onCoordinatesChange={handleCoordinatesChange}
                                onAdditionalLocationsChange={handleAdditionalLocationsChange}
                            />
                        </div>
                    ) : (
                        <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                            <DatePicker
                                selectorType="delivery"
                                pickupDate={pickupDate}
                                onDateChange={handleDateChange}
                                setDate={deliveryDate}
                            />
                        </div>
                    )
                )}
                {currentStep === 4 && (
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <AdditionalServices
                            quoteType={quoteType}
                            onAdditionalServicesChange={handleAdditionalServicesChange}
                            additionalServices={additionalServices}
                        />
                    </div>
                )}
                {currentStep === 5 && (
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <AddItems 
                            setTrailerConfig={TRAILER_CONFIG}
                            setAddedItems={items}
                            setAddedVolume={availableVolume}
                            setAddedWeight={availableWeight}
                            onVolumeChange={handleVolumeChange}
                            onWeightChange={handleWeightChange}
                            onItemsChange={handleItemsChange}
                        />
                        <Extras
                            setAlcohol={containAlcohol}
                            onContainAlcohol={handleContainAlcohol} 
                            disableButton={handleDisableButton}
                        />
                    </div>
                )}
            </Suspense>
    
            <NavigationButtons
                currentStep={currentStep}
                currentSubStep={currentSubStep}
                maxStep={totalSteps}   
                maxSubStep={stepConfig[currentStep]}
                onNext={handleNext}
                onBack={handleBack}
                isNextDisabled={isNextDisabled()}
            />
        </div>
    );
}
