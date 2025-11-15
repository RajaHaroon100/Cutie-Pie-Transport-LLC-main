import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Quote Components/RadioButtons.css'

 export default function Extras( {onContainAlcohol, setAlcohol, disableButton} ) {
    const [isTradeShow, setIsTradeShow] = useState('no');
    const [containHazardous, setContainHazardous] = useState('no');
    const [containAlcohol, setContainAlcohol] = useState('no');

    const handleTradeShow = (event) => {
        setIsTradeShow(event.target.value);
    };

    const handleContainHazardous = (event) => {
        setContainHazardous(event.target.value);
    };

    const handleContainAlcohol = (event) => {
        setContainAlcohol(event.target.value);
    };

    useEffect(() => {
        if (setAlcohol === 'yes') setContainAlcohol(setAlcohol);
        disableButton(false);
    }, []);

    useEffect(() => {
        if (isTradeShow === 'yes' || containHazardous === 'yes' || containAlcohol === 'yes') {
            disableButton(true);
        } else {
            disableButton(false);
        }
    }, [isTradeShow, containHazardous, containAlcohol]);

    return(
        <div className='font-sans flex justify-center mb-8'>
            <div className='flex flex-col w-2/3 border-t border-secondary border-opacity-15 pt-8'>
                <div className="mb-4">
                    <div className="flex justify-between mb-1 space-x-4">
                        <label className="block text-subHeading_1 mb-1 text-sm sm:text-base font-semibold">
                            Is this shipment going to or from a trade show? <span className="text-red-500 text-xl">*</span>
                        </label>
                        <div className="flex items-center font-semibold text-sm">
                            <label className="radio-label first">
                                <input
                                    type="radio"
                                    name="tradeShow"
                                    value="yes"
                                    checked={isTradeShow === 'yes'}
                                    onChange={handleTradeShow}
                                    className="hidden" 
                                />
                                <span className="radio-button">Yes</span>
                            </label>
                            <label className="radio-label last">
                                <input
                                    type="radio"
                                    name="tradeShow"
                                    value="no"
                                    checked={isTradeShow === 'no'}
                                    onChange={handleTradeShow}
                                    className="hidden"
                                />
                                <span className="radio-button">No</span>
                            </label>
                        </div>    
                    </div>
                    {isTradeShow === 'yes' && 
                        <div className='text-red-600'>
                            <p className="text-xs sm:text-base">
                                Trade show shipments require special care so we're unable to 
                                quote this online. Please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                                possible quote options.
                            </p>
                        </div>
                    }
                </div>

                
                <div className="mb-4">
                    <div className="mb-1 flex justify-between">
                        <label className="block text-subHeading_1 mb-1 text-sm sm:text-base font-semibold">
                            Does this shipment contain hazardous items? <span className="text-red-500 text-xl">*</span>
                        </label>
                        <div className="flex items-center font-semibold text-sm">
                            <label className="radio-label first">
                                <input
                                    type="radio"
                                    name="hazardousItem"
                                    value="yes"
                                    checked={containHazardous === 'yes'}
                                    onChange={handleContainHazardous}
                                    className="hidden" 
                                />
                                <span className="radio-button">Yes</span>
                            </label>
                            <label className="radio-label last">
                                <input
                                    type="radio"
                                    name="hazardousItem"
                                    value="no"
                                    checked={containHazardous === 'no'}
                                    onChange={handleContainHazardous}
                                    className="hidden"
                                />
                                <span className="radio-button">No</span>
                            </label>
                        </div>
                    </div>
                    {containHazardous === 'yes' && 
                        <div className='text-red-600'>
                            <p className="text-xs sm:text-base">
                                We do not handle the shipment of hazardous materials.
                            </p>
                        </div>
                    }
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-subHeading_1 mb-1 text-sm sm:text-base font-semibold">
                            Does this shipment contain alcohol? <span className="text-red-500 text-xl">*</span>
                        </label>
                        <div className="flex items-center font-semibold text-sm">
                            <label className="radio-label first">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="yes"
                                    checked={containAlcohol === 'yes'}
                                    onChange={handleContainAlcohol}
                                    className="hidden" 
                                />
                                <span className="radio-button">Yes</span>
                            </label>
                            <label className="radio-label last">
                                <input
                                    type="radio"
                                    name="alcohol"
                                    value="no"
                                    checked={containAlcohol === 'no'}
                                    onChange={handleContainAlcohol}
                                    className="hidden"
                                />
                                <span className="radio-button">No</span>
                            </label>
                        </div>
                        
                    </div>
                    {containAlcohol === 'yes' && 
                        <div className='text-red-600 mt-1'>
                            <p className="text-xs sm:text-base">
                                Shipments which contain alcohol require special care so we're unable to 
                                quote this online. Please <Link to="/contactUs"><span className='underline hover:text-text_1'>Contact Us</span></Link> for 
                                possible quote options.
                            </p>
                        </div>
                    }
                 </div>
             </div>
         </div>
    );
}
