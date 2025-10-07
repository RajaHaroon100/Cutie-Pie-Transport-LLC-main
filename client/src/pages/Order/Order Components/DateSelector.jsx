import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import CalendarSVG from '../../../assets/SVGs/clock-and-calendar.svg';
import { FaExclamation, FaCalendar, FaClock } from 'react-icons/fa';
import 'flatpickr/dist/themes/material_orange.css';

export default function DateSelector({ onDateChange, setDate, pickupDate }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeZone, setSelectedTimeZone] = useState('Select a timezone');
    const [warning, setWarning] = useState('');
    const [minTime, setMinTime] = useState(null);

    const timeZones = [
        'Select a timezone',
        'Newfoundland Daylight Time (GMT-2:30)',
        'Atlantic Daylight Time (GMT-3)',
        'Central Daylight Time (GMT-5)',
        'Eastern Standard Time (GMT-5)',
        'Central Standard Time (GMT-6)',
        'Mountain Daylight Time (GMT-6)',
        'Mountain Standard Time (GMT-7)',
        'Pacific Daylight Time (GMT-8)',
        'Pacific Standard Time (GMT-8)',
    ];

    useEffect(() => {
        const today = new Date();
        const initialDate = new Date(today.setDate(today.getDate() + 1));

        if (!setDate) {
            setSelectedDate(initialDate);
            setSelectedTime(null);
            onDateChange({ date: initialDate, time: null, timeZone: selectedTimeZone });
        } else {
            setSelectedDate(setDate.date || initialDate);
            setSelectedTime(setDate.time || null);
            setSelectedTimeZone(setDate.timeZone || 'Select a timezone');

            if (setDate.date && setDate.date.toDateString() === new Date().toDateString()) {
                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() + 4, 0, 0, 0);
                setMinTime(currentTime);
            }
        }
    }, [setDate, onDateChange]);

    const handleDateChange = (date) => {
        const newDate = date[0];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        if (newDate.toDateString() === today.toDateString()) {
            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 4, 0, 0, 0);
            const formattedTime = formatTime(currentTime);
            setSelectedTime(formattedTime);
            setMinTime(currentTime);
            setWarning("You are scheduling an appointment for today. If you do not receive a call from us at the selected time, please feel free to reach out to us directly at +1 (770) 572-5863.");
        } else {
            setWarning('');
            setMinTime(null);
            setSelectedTime(null);
        }
        setSelectedDate(newDate);
        onDateChange({ date: newDate, time: newDate.toDateString() === today.toDateString() ? selectedTime : null, timeZone: selectedTimeZone });
    };

    const handleTimeChange = (time) => {
        const newTime = time[0];
        if (newTime) {
            const formattedTime = formatTime(newTime);
            setSelectedTime(formattedTime);
            onDateChange({ date: selectedDate, time: formattedTime, timeZone: selectedTimeZone });
        } else {
            setSelectedTime(null);
            onDateChange({ date: selectedDate, time: null, timeZone: selectedTimeZone });
        }
    };

    const handleTimeZoneChange = (event) => {
        const newTimeZone = event.target.value;
        setSelectedTimeZone(newTimeZone);
        onDateChange({ date: selectedDate, time: selectedTime, timeZone: newTimeZone });
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);

    const maxDate = pickupDate ? new Date(pickupDate) : null;

    return (
        <div className="flex justify-center mb-8 font-sans">
            <div className="flex flex-col w-full sm:w-2/3 px-4">
                <div className="flex flex-col items-center text-center">
                    <img className="mb-6 max-w-20 md:max-w-28" src={CalendarSVG} alt="calendar-svg" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-heading_1">
                        Schedule an <span className="text-heading_2">appointment</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-subHeading_1">
                        <span className="text-xl text-red-500">*</span> Indicates a required field
                    </p>
                </div>
    
                <div className="relative mt-8">
                    <p className="text-text_1">Select a date <span className="text-xl text-red-500">*</span></p>
                    <div className="relative">
                        <Flatpickr
                            value={selectedDate}
                            onChange={handleDateChange}
                            options={{
                                minDate: minDate,
                                maxDate: maxDate,
                                dateFormat: 'm-d-Y',
                                disableMobile: "true"
                            }}
                            className="w-full px-3 py-2 mt-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            
                        />
                        <FaCalendar className="absolute w-5 cursor-pointer pointer-events-none right-3 top-5 text-primary"/>
                    </div>
                </div>
    
                {warning && 
                    <div className="flex items-center justify-center mt-2 text-sm text-amber-800">
                        <FaExclamation className="max-h-4 min-h-4"/>
                        <p className="ml-2"><span className="font-semibold">Caution: </span>{warning}</p>
                    </div>
                }
    
                <div className="relative mt-8">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="relative w-full md:w-7/12 mb-4 md:mb-0">
                            <p className="text-text_1">Select a time <span className="text-xl text-red-500">*</span></p>
                            <Flatpickr
                                value={selectedTime}
                                onChange={handleTimeChange}
                                options={{
                                    noCalendar: true,
                                    enableTime: true,
                                    time_24hr: false,
                                    minTime: minTime,
                                    dateFormat: 'h:i K',
                                    disableMobile: "true"
                                }}
                                className="w-full px-3 py-2 mt-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <FaClock className="absolute w-5 cursor-pointer pointer-events-none right-3 top-12 text-primary"/>
                        </div>
                        
                        <div className="relative w-full md:w-5/12">
                            <p className="text-text_1">Time zone <span className="text-xl text-red-500">*</span></p>
                            <select
                                value={selectedTimeZone}
                                onChange={handleTimeZoneChange}
                                className="w-full px-3 pt-2 pb-3 mt-2 bg-white border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {timeZones.map((zone) => (
                                    <option key={zone} value={zone}>{zone}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
}
