import React from 'react';

const NavigationButtons = ({ currentStep, maxStep, onNext, onBack, isNextDisabled }) => {
    return (
        <div className="flex space-x-8 px-4 justify-between mt-8">
            <button
                onClick={onBack}
                className={`w-full py-2 px-4 ${currentStep === 1?"border-gray-500 text-gray-500":"border-primary text-primary  animated-button"} bg-white border rounded-lg`}
                disabled={currentStep === 1}
            >
                <span className='font-semibold'>Back</span>
            </button>
            <button
                onClick={onNext}
                className={`w-full py-2 px-4 ${isNextDisabled? "bg-gray-400" : "bg-primary animated-button-orange"}  text-text_1 rounded-lg`}
                disabled={isNextDisabled}
            >
                <span className='font-semibold'>{maxStep === currentStep ? "Finish" : "Next"}</span>
            </button>
        </div>
    );
};

export default NavigationButtons;

