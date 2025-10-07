import React from 'react';
import moment from 'moment';

const OrderCard = ({ order, onClick, isSelected }) => {
    return (
        <div 
            className={`p-4 border border-gray-300 cursor-pointer font-sans ${
                isSelected ? 'bg-gray-300' : 'hover:bg-gray-200'
            }`}
            onClick={() => onClick(order)}
        >
            <h3 className="text-lg font-semibold text-heading_1">{order.personalDetails.fullName}</h3>
            {order.status === 'Request' ? 
                <p className='text-sm text-subHeading_1 truncate'>
                    Appointment: <strong>{moment(order.appointmentDate.date).format('MMMM Do, YYYY')}</strong> at 
                    <strong> {order.appointmentDate.time}</strong>
                </p>
                :
                <>
                    <p className='text-sm text-subHeading_1'>Pickup Date: <strong>{moment(order.formData.pickupDate).format('MMMM Do, YYYY')}</strong></p>
                    <p className='text-sm text-subHeading_1 truncate'>Pickup Address: <strong>{order.formData.shippingAddress}</strong></p>
                </>
            }
            
        </div>
    );
};

export default OrderCard;