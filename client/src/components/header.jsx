import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImg from '../assets/Images/logo.png';
import '../App.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`header sticky top-0 z-50 flex items-center justify-between text-heading_1 bg-primary shadow-md font-sans ${isScrolled ? 'header-scrolled' : ''}`}>
            <Link to="/">
                <div className="flex items-center">
                    <img className="h-20 w-40" src={logoImg} alt="Logo" />
                </div>
            </Link>
            <div className="hidden md:flex space-x-4 text-heading_1 font-semibold">
                <Link to="/" className="relative px-4 py-2 text-lg group">
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-accent transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/services" className="relative px-4 py-2 text-lg group">
                    Services
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-accent transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/aboutUs" className="relative px-4 py-2 text-lg group">
                    About Us
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-accent transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/contactUs" className="relative px-4 py-2 text-lg group">
                    Contact Us
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-accent transition-all group-hover:w-full"></span>
                </Link>
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-xl">
                    {isMenuOpen ? <FaTimes className='text-heading_1' /> : <FaBars className='text-heading_1' />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-primary flex flex-col items-center py-4 md:hidden shadow-md border-b border-orange-700">
                    <Link to="/" onClick={toggleMenu} className="text-lg w-full text-center py-2 border-b border-accent">
                        Home
                    </Link>
                    <Link to="/services" onClick={toggleMenu} className="text-lg w-full text-center py-2 border-b border-accent">
                        Services
                    </Link>
                    <Link to="/aboutUs" onClick={toggleMenu} className="text-lg w-full text-center py-2 border-b border-accent">
                        About Us
                    </Link>
                    <Link to="/contactUs" onClick={toggleMenu} className="text-lg w-full text-center pt-2">
                        Contact Us
                    </Link>
                </div>
            )}
        </div>
    );
}
