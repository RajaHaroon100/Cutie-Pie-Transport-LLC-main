import React from 'react';
import moment from 'moment';

const SignedAgreementCard = ({ agreement, onClick, isSelected }) => {
    return (
        <div 
            className={`p-4 border border-gray-300 cursor-pointer font-sans ${
                isSelected ? 'bg-gray-300' : 'hover:bg-gray-200'
            }`}
            onClick={() => onClick(agreement)}
        >
            <h3 className="text-lg font-semibold text-heading_1">{agreement.signed}</h3>
            <p className='text-sm text-subHeading_1'>
                Signed on: <strong>{moment(agreement.date).format('MMMM Do, YYYY')}</strong>
            </p>
        </div>
    );
};

export default SignedAgreementCard;