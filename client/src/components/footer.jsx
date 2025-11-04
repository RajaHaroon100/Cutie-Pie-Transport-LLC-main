
import React from 'react';
import { Link } from 'react-router-dom';
import instaLogo from '../assets/SVGs/Instagram.svg';
import youtubeLogo from '../assets/SVGs/YouTube.svg';
import facebookLogo from '../assets/SVGs/Facebook.svg';
import linkedinLogo from '../assets/SVGs/LinkedIn.svg';
import phoneImg from '../assets/SVGs/Phone.svg';
import locationImg from '../assets/SVGs/Location.svg';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-8 px-4 sm:px-8 lg:px-36 font-sans">
            <div className='border-b-2 border-gray-600 pb-8'>
                <div className="container mx-auto flex flex-wrap justify-between gap-6 md:gap-12">
                    <div className="flex-1 space-y-2 pr-4 md:pr-4 text-sm md:text-base border-r-2 border-gray-600">
                        <Link to="/services" className="block hover:underline">
                            <h2 className="text-xl sm:text-2xl font-bold pb-2">Modes</h2>
                        </Link>
                        <Link to="/FTLQuote" className="block hover:underline">Full Truckload (FTL)</Link>
                        <Link to="/LTLQuote" className="block hover:underline">Less Than Truckload (LTL)</Link>
                        {/* <Link to="/DrayageQuote" className="block hover:underline">Drayage</Link> */}
                    </div>
                    <div className="flex-1 space-y-2 px-4 md:px-4 text-sm md:text-base border-r-2 border-gray-600">
                        <Link to="/services" className="block hover:underline">
                            <h2 className="text-xl sm:text-2xl font-bold pb-2">Services</h2>
                        </Link>
                        <Link to="/services" className="block hover:underline">Drop Trailer</Link>
                        <Link to="/services" className="block hover:underline">Partials</Link>
                        <Link to="/services" className="block hover:underline">High Value Shipments</Link>
                        <Link to="/services" className="block hover:underline">Port and Rail Services</Link>
                    </div>
                    <div className='flex flex-col space-y-4 mt-2 md:mt-6 px-4 md:px-8'>
                        <Link to="/aboutUs" className="text-lg sm:text-xl font-bold pb-2 hover:underline">About Us</Link>
                        <Link to="/contactUs" className="text-lg sm:text-xl font-bold pb-2 hover:underline">Contact Us</Link>
                        <Link to="/accessorial-policy" className="text-lg sm:text-xl font-bold pb-2 hover:underline">Accessorial Policy</Link>
                    </div>
                    <div className='flex flex-col space-y-4 mt-6 md:mt-10 px-4 md:px-8'>
                        <Link to="quote">
                            <button className="w-full bg-primary hover:bg-accent text-heading_1 font-semibold py-2 px-4 rounded">Get a Quote</button>
                        </Link>
                        <Link to="trackShipment">
                            <button className="w-full bg-primary hover:bg-accent text-heading_1 py-2 px-4 font-semibold rounded">Track Shipment</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8 flex flex-wrap gap-6 md:gap-12">
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Follow Us</h2>
                    <div className="flex flex-wrap gap-4">
                        <a href="#" className="flex items-center space-x-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 hover:bg-fuchsia-700 rounded-full flex items-center justify-center">
                                <img src={instaLogo} alt="instagram" className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </div>
                        </a>
                        <a href="#" className="flex items-center space-x-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 hover:bg-red-700 rounded-full flex items-center justify-center">
                                <img src={youtubeLogo} alt="youtube" className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </div>
                        </a>
                        <a href="#" className="flex items-center space-x-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 hover:bg-sky-600 rounded-full flex items-center justify-center">
                                <img src={facebookLogo} alt="facebook" className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </div>
                        </a>
                        <a href="#" className="flex items-center space-x-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 hover:bg-blue-700 rounded-full flex items-center justify-center">
                                <img src={linkedinLogo} alt="linkedin" className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Contact Us</h2>
                    <div className="flex items-center space-x-2">
                        <img src={phoneImg} alt="phone-number" className="w-5 h-5 sm:w-6 sm:h-6"/>
                        <p className='text-sm'>+1 (770) 572-5863</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src={locationImg} alt="location" className="w-5 h-5 sm:w-6 sm:h-6"/>
                        <p className='text-sm'>270 Gulfport Dr, Hampton, GA 30228</p>
                    </div>
                </div>
                <div className="flex-1 space-y-4 hidden md:block">
                    <Link to="/login" className="text-md sm:text-lg hover:underline">Admin LogIn</Link>
                </div>
            </div>
        </footer>
    );
}

