import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import ProgressBar from './Order Components/Progress Bar/ProgressBar';
import NavigationButtons from './Order Components/NavigationButtons';
import '../../components/Essentials/Loading/Loading.css'

const PersonalDetails = lazy(() => import('./Order Components/PersonalDetails'));
const SetAppointment = lazy(() => import('./Order Components/DateSelector'));
const ConfirmOrder = lazy(() => import('./Order Components/ConfirmOrder'));
const ConfirmAddresses = lazy(() => import('./Order Components/ConfirmAddresses'))

export default function PlaceOrderForm() {
    
    const location = useLocation();
    const formData = location.state;
    
    const [currentStep, setCurrentStep] = useState(1);
    const [currentSubStep, setCurrentSubStep] = useState(1);

    const [next, setNext] = useState(false);

    const [personalDetails, setPersonalDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        phoneExtension: '',
        company: '',
    });

    const [appointmentDate, setAppointmentDate] = useState(null);
    const [addresses, setAddresses] = useState({
        pickupAddress: '',
        deliveryAddress: '',
    });

    const stepConfig = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
    };

    const totalSteps = Object.keys(stepConfig).length;

    useEffect(()=>{
        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });
    }, [currentStep, currentSubStep])

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

    }

    const isNextDisabled = () => {
        if (currentStep === 1) {
            if (personalDetails.fullName === '' 
                || personalDetails.email === '' 
                || personalDetails.phoneNumber === '')
                return true;
            
            if (next === true) return true;
        }
        if (currentStep === 2) {
            if (appointmentDate) {
                if (appointmentDate.date === null) return true;
                if (appointmentDate.time === null) return true;
                if (appointmentDate.timeZone === 'Select a timezone') return true;
            }
        }
        if (currentStep === 3) {
            if (addresses.pickupAddress === '' || addresses.deliveryAddress === '') return true;
        }
        if (currentStep === 4) return true;
    }

    const handlePersonalDetailsChange = (data) => {
        setPersonalDetails(data);
    };

    const handleError = (next) => {
        setNext(next);
    };

    const handleDateChange = (date) => {
        setAppointmentDate(date);
    };

    const handleAddressesChange = (newAddresses) => {
        setAddresses(newAddresses);
    };

    return(
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
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <PersonalDetails 
                            onDataChange={handlePersonalDetailsChange}
                            onError={handleError}
                            setDetails={personalDetails}
                        />
                    </div>
                )}
                {currentStep === 2 && (
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <SetAppointment
                            pickupDate={formData.pickupDate}
                            onDateChange={handleDateChange}
                            setDate={appointmentDate}
                        />
                    </div>
                )}
                {currentStep === 3 && (
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <ConfirmAddresses
                            onAddressesChange={handleAddressesChange}
                            addresses={addresses}
                        />
                    </div>
                )}
                {currentStep === 4 && (
                    <div className='p-4 sm:p-6 md:p-8 bg-accent rounded-xl'>
                        <ConfirmOrder
                            personalDetails={personalDetails}
                            appointmentDate={appointmentDate}
                            addresses={addresses}
                            formData={formData}
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