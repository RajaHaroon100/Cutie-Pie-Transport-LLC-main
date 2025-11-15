import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import CalendarSVG from '../../../assets/SVGs/calendar-quote.svg';
import { FaExclamation, FaCalendar } from 'react-icons/fa';
import 'flatpickr/dist/themes/material_orange.css';
import { Link } from 'react-router-dom';

 export default function DateSelector({ selectorType, onDateChange, setDate, pickupDate }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (setDate) setSelectedDate(setDate);
    }, [setDate]);

    useEffect(() => {
        let initialDate;

        if (selectorType === 'delivery' && pickupDate) {
            initialDate = new Date(pickupDate);
            initialDate.setDate(initialDate.getDate() + 1);
        } else {
            const today = new Date();
            initialDate = new Date(today);
            initialDate.setDate(today.getDate() + 1);
        }

        if (isWeekend(initialDate)) {
            const daysToAdd = initialDate.getDay() === 6 ? 2 : 1;
            initialDate.setDate(initialDate.getDate() + daysToAdd);
        }

        if (!setDate) {
            setSelectedDate(initialDate);
            onDateChange(initialDate);
        }
    }, [selectorType, pickupDate]);

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const handleDateChange = (date) => {
        const newDate = date[0];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (newDate.toDateString() === today.toDateString()) {
            setWarning("Caution: Carriers may not be able to accommodate same-day online pickup requests.");
        } else {
            setWarning('');
        }
        onDateChange(newDate);
    };

    let maxDate;
    if (selectorType === 'delivery' && pickupDate) {
        maxDate = new Date(pickupDate);
        maxDate.setDate(maxDate.getDate() + 7);
    } else {
        maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 28);
    }

    const minDate = selectorType === 'delivery' && pickupDate ? new Date(pickupDate) : new Date();
    minDate.setHours(0, 0, 0, 0);

    return (
        <div className='font-sans flex justify-center mb-8'>
            <div className='flex flex-col w-2/3'>
                <div className='flex flex-col items-center'>
                    <img className='w-24 sm:w-28 mb-6' src={CalendarSVG} alt="calendar-svg" />
                    <h2 className='text-2xl sm:text-3xl text-heading_1 font-semibold text-center'>
                        When will your items be 
                        <span className='text-heading_2'>
                            {selectorType === 'pickup' ? ' ready for pickup' : ' delivered'}
                        </span>?
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-subHeading_1 text-center">
                        <span className="text-red-500 text-xl">*</span> Indicates a required field
                    </p>
                </div>

                <div className='relative mt-8'>
                    <p className='text-text_1'>
                        {selectorType === 'pickup' ? 'Requested loading date' : 'Requested delivery date'} 
                        <span className="text-red-500 text-xl">*</span>
                    </p>
                    <div className='relative'>
                        <Flatpickr
                            value={selectedDate}
                            onChange={handleDateChange}
                            options={{
                                minDate: minDate,
                                maxDate: maxDate,
                                dateFormat: 'm-d-Y',
                                // disable: [date => isWeekend(date)],
                                disableMobile: "true"
                            }}
                            className='w-full mt-2 px-3 py-2 border border-black hover:border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                        />
                        <FaCalendar className='cursor-pointer pointer-events-none absolute right-3 top-5 w-5 text-primary'/>
                    </div>
                    <p className='text-gray-700 text-sm mt-2'>
                        Requested date is subject to carrier acceptance and availability.
                    </p>
                </div>
                {warning && (
                    <div className='flex items-center mt-8 text-amber-800'>
                        <FaExclamation className='max-h-6 min-h-6'/>
                        <p className='ml-2 text-center text-sm sm:text-base'>
                            {warning} <span className='underline hover:text-text_1'><Link to="/contactUs">Contact us</Link></span> for immediate booking.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
