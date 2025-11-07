import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Comment({ name, heading, comment, stars }) {
    const totalStars = 5;

    return (
        <div className="border font-sans p-6 my-4 mx-0 md:mx-12 rounded-xl shadow-md bg-accent">
            <div className='flex flex-col md:flex-row md:items-center'>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-heading_1">{heading}</h3>
                <div className="flex mb-4 md:mb-0 md:ml-4 pb-2">
                    {[...Array(totalStars)].map((_, index) => (
                        index < stars ? (
                            <FaStar key={index} className="text-primary" />
                        ) : (
                            <FaRegStar key={index} className="text-primary" />
                        )
                    ))}
                </div>
            </div>
            <FaQuoteLeft className='text-primary'/>
            <p className="text-base md:text-lg italic mb-4 text-text_1 pl-6 overflow-y-visible">{comment}</p>
            <p className="text-xs md:text-sm font-bold text-right">- {name}</p>
        </div>
    );
}

