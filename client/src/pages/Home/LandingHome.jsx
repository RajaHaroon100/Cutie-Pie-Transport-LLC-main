import React, { useState, useEffect } from 'react';
import firstTruckImg from '../../assets/Images/truck-1.jpg';
import secondTruckImg from '../../assets/Images/truck-4.jpg';
import thirdTruckImg from '../../assets/Images/truck-6.jpg';
import { Link } from 'react-router-dom';

const images = [
    {
        src: firstTruckImg,
        alt: 'truck-img',
    },
    {
        src: secondTruckImg,
        alt: 'truck-img',
    },
    {
        src: thirdTruckImg,
        alt: 'truck-img',
    },
];

export default function Landing() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-12 md:mb-24 border-b-8 border-primary relative w-full h-screen shadow-md overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="relative w-full h-full">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute w-full h-full inset-0 bg-primary opacity-10"></div>
                    </div>
                    <div className="px-8 md:px-20 lg:px-36 absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg md:text-2xl text-[#B37D4E] border-b-2 font-semibold border-accent mb-4">
                            Cutie Pie Transport LLC
                        </h3>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#B37D4E]">
                            Connecting Your Business To The Success
                        </h1>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-8">
                            <Link to="/quote">
                                <button className="animated-button-orange bg-[#e63984] font-semibold px-6 md:px-8 py-3 md:py-4 shadow-md rounded-lg">
                                    <span>Get a Quote</span>
                                </button>
                            </Link>
                            <Link to="/aboutUs">
                                <button className="animated-button bg-secondary font-semibold px-6 md:px-8 py-3 md:py-4 shadow-md rounded-lg">
                                    <span>Learn More</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

