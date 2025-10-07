import React from 'react';
import './ProgressBar.css';

import AppointmentSvg from '../../../../assets/SVGs/appointment.svg'
import personalDetailsSvg from '../../../../assets/SVGs/personal-details.svg'
import orderConfirmSvg from '../../../../assets/SVGs/order-confirm.svg'
import LocationImg from '../../../../assets/SVGs/location-colored.svg'

const ProgressBar = ({ currentStep, currentSubStep, stepConfig }) => {
    const totalSteps = Object.keys(stepConfig).length;

    return (
        <div className="progress-container flex items-center">
            {Array.from({ length: totalSteps }).map((_, stepIndex) => (
                <React.Fragment key={stepIndex}>
                    {/* Main Step Indicator */}
                    <div className='flex flex-col items-center relative'>
                        <div className={`step ${currentStep > stepIndex + 1 ? 'completed' : ''} ${currentStep === stepIndex + 1 ? 'active' : ''}`}>
                            {stepIndex + 1 === 1 && <img className='max-w-5' src={personalDetailsSvg} alt="img"/>}
                            {stepIndex + 1 === 2 && <img className='max-w-5' src={AppointmentSvg} alt="img"/>}
                            {stepIndex + 1 === 3 && <img className='max-w-5' src={LocationImg} alt="img"/>}
                            {stepIndex + 1 === 4 && <img className='max-w-5' src={orderConfirmSvg} alt="img"/>}
                        </div>
                        <div className='absolute top-9 text-xs text-text_1 hidden sm:block'>
                            {stepIndex + 1 === 1 && <p>Personal<span className='pl-1'>Details</span></p>}
                            {stepIndex + 1 === 2 && <p>Set<span className='pl-1'>Appointment</span></p>}
                            {stepIndex + 1 === 3 && <p>Finalize<span className='pl-1'>Addresses</span></p>}
                            {stepIndex + 1 === 4 && <p>Confirm<span className='pl-1'>Order</span></p>}
                        </div>
                    </div>
                    
                    {/* Render substeps only if the current step has substeps */}
                    {stepConfig[stepIndex + 1] > 1 && (
                        <div className="substeps-container flex items-center">
                            {Array.from({ length: stepConfig[stepIndex + 1] - 1 }).map((_, subStepIndex) => (
                                <div 
                                    key={subStepIndex} 
                                    className={`line substep ${currentStep > stepIndex + 1 || (currentStep === stepIndex + 1 && currentSubStep > subStepIndex + 1) ? 'filled' : ''}`}
                                ></div>
                            ))}
                        </div>
                    )}

                    {/* Connector Line */}
                    {stepIndex < totalSteps - 1 && (
                        <div className={`line ${currentStep > stepIndex + 1 ? 'filled' : ''}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ProgressBar;


