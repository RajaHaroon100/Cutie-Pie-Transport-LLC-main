import React, { useState, useEffect } from 'react';
import PersonalDetailsSVG from '../../../assets/SVGs/person.svg';

export default function PersonalDetails({ onDataChange, onError, setDetails }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneExtension, setPhoneExtension] = useState('');
    const [company, setCompany] = useState('');

    const [errors, setErrors] = useState({});
    const [disableNext, setDisableNext] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phoneNumber);
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');

        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneNumberChange = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhoneNumber(formattedPhoneNumber);
    };

    useEffect(() => {
        const formErrors = {};

        if (email === '') formErrors.email = '';
        else if (!validateEmail(email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        if (phoneNumber === '') formErrors.phoneNumber = '';
        else if (!validatePhoneNumber(phoneNumber)) {
            formErrors.phoneNumber = 'Please enter a valid US/Canada phone number.';
        }

        setErrors(formErrors);
        
        if (formErrors.email)
            onError(true);
        if (formErrors.phoneNumber)
            onError(true);
        if (!formErrors.email && !formErrors.phoneNumber)
            onError(false);
        
        onDataChange({
            fullName,
            email,
            phoneNumber,
            phoneExtension,
            company,
        });
    }, [fullName, email, phoneNumber, phoneExtension, company]);

    useEffect(() => {
        if (setDetails.fullName != '') {
            setFullName(setDetails.fullName)
        }
        if (setDetails.email != '') {
            setEmail(setDetails.email)
        }
        if (setDetails.phoneNumber != '') {
            setPhoneNumber(setDetails.phoneNumber)
        }
        if (setDetails.phoneExtension != '') {
            setPhoneExtension(setDetails.phoneExtension)
        }
        if (setDetails.company != '') {
            setCompany(setDetails.company)
        }
    }, [])

    return (
        <div className="flex justify-center mb-8 font-sans">
            <div className="flex flex-col w-full md:w-2/3 px-4">
                <div className="flex flex-col items-center mb-8 text-center">
                    <img className="mb-6 max-w-24 md:max-w-32" src={PersonalDetailsSVG} alt="item-svg" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-heading_1">
                        Let’s begin with your <span className="text-heading_2">personal details</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-subHeading_1">
                        <span className="text-xl text-red-500">*</span> Indicates a required field
                    </p>
                </div>
                <form>
                    <div className="mb-4">
                        <p className="mb-2 text-text_1" htmlFor="fullName">
                            Full Name <span className="text-red-500">*</span>
                        </p>
                        <input
                            id="fullName"
                            type="text"
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-2 text-text_1" htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </p>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="mt-1 text-xs text-text_1">
                            {errors.email && <p className="my-1 text-sm italic text-red-600">{errors.email}</p>}
                            <p>Please ensure that you provide an active email address that you currently use.</p>
                            <p>All order updates will be communicated to this email.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 mb-4">
                            <p className="mb-2 text-text_1" htmlFor="phoneNumber">
                                Phone Number <span className="text-red-500">*</span>
                            </p>
                            <input
                                id="phoneNumber"
                                type="tel"
                                className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                            <div className="mt-1 text-xs text-text_1">
                                {errors.phoneNumber && <p className="my-1 text-sm italic text-red-600">{errors.phoneNumber}</p>}
                                <p>Please ensure that you provide an active phone number that you currently use.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 mb-4">
                            <p className="mb-2 text-text_1" htmlFor="phoneExtension">
                                Phone Extension
                            </p>
                            <input
                                id="phoneExtension"
                                type="text"
                                maxLength="6"
                                className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={phoneExtension}
                                onChange={(e) => setPhoneExtension(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-text_1" htmlFor="company">
                            Company
                        </p>
                        <input
                            id="company"
                            type="text"
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
    
}
