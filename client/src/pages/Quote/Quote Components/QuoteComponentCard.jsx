import React, { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import HelpBox from './HelpBox';

 export default function QuoteComponentCard({ svg, title, value, description, helpbox, isSelected, onCardClick }) {
    
    const [isHelpBoxOpen, setIsHelpBoxOpen] = useState(false);

    const openHelpBox = () => setIsHelpBoxOpen(true);
    const closeHelpBox = () => setIsHelpBoxOpen(false);

    return (
        <div 
            className={`flex justify-between bg-bg shadow-sm border-2 ${isSelected ? 'border-primary' : 'border-bg'} p-4 rounded-lg cursor-pointer`} 
            onClick={() => onCardClick(value)}
        >
            <input 
                name={title} 
                type='checkbox' 
                value={value} 
                checked={isSelected}
                onChange={() => {}}
                className='w-4 h-4 min-w-4 appearance-none bg-accent text-primary border border-primary rounded-full checked:bg-primary focus:outline-none focus:ring-primary focus:ring-2'
            />
            <div className="flex flex-col items-center">
                <img className='max-w-32 min-w-32 mb-2' src={svg} alt="card-img" />
                <h3 className='text-xl text-center text-heading_2 font-bold'>{title}</h3>
                <p className='text-center text-text_1 text-sm pt-2'>{description}</p>
            </div>
            <FaQuestionCircle className='min-w-4 text-primary' onClick={(e) => { openHelpBox(); }} />
            <HelpBox isOpen={isHelpBoxOpen} onClose={closeHelpBox} helpbox={helpbox} svg={svg} title={title} />
        </div>
    );
}
