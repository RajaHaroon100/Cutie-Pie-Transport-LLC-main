import React from 'react';
import './ProgressBar.css';

import EquipmentTypeImg from '../../../../assets/SVGs/drop-trailer.svg'
import LocationImg from '../../../../assets/SVGs/location-colored.svg'
import BoxImg from '../../../../assets/SVGs/shipment-box.svg'
import ServicesImg from '../../../../assets/SVGs/services.svg'
import FreightClassSVG from '../../../../assets/SVGs/partials.svg'

const ProgressBar = ({ currentStep, currentSubStep, stepConfig }) => {
    const totalSteps = Object.keys(stepConfig).length;

    return (
        <div className="progress-container flex items-center">
            {Array.from({ length: totalSteps }).map((_, stepIndex) => (
                <React.Fragment key={stepIndex}>
                    {/* Main Step Indicator */}
                    <div className='flex flex-col items-center relative'>
                        <div className={`step ${currentStep > stepIndex + 1 ? 'completed' : ''} ${currentStep === stepIndex + 1 ? 'active' : ''}`}>
                            {stepIndex + 1 === 1 && <img className='max-w-5' src={EquipmentTypeImg} alt="img"/>}
                            {stepIndex + 1 === 2 && <img className='max-w-5' src={LocationImg} alt="img"/>}
                            {stepIndex + 1 === 3 && <img className='max-w-5' src={LocationImg} alt="img"/>}
                            {stepIndex + 1 === 4 && <img className='max-w-5' src={ServicesImg} alt="img"/>}
                            {stepIndex + 1 === 5 && <img className='max-w-5' src={BoxImg} alt="img"/>} 
                            {stepIndex + 1 === 6 && <img className='max-w-5' src={FreightClassSVG} alt="img"/>} 
                        </div>
                        <div className='absolute hidden sm:block top-9 text-xs text-text_1'>
                            {stepIndex + 1 === 1 && <p>Equipment<span className='pl-1'>Type</span></p>}
                            {stepIndex + 1 === 2 && <p>Pickup<span className='pl-1'>Details</span></p>}
                            {stepIndex + 1 === 3 && <p>Delivery<span className='pl-1'>Details</span></p>}
                            {stepIndex + 1 === 4 && <p>Additional<span className='pl-1'>Services</span></p>}
                            {stepIndex + 1 === 5 && <p>Add<span className='pl-1'>Items</span></p>}
                            {stepIndex + 1 === 6 && <p>Freight<span className='pl-1'>Class</span></p>}
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


