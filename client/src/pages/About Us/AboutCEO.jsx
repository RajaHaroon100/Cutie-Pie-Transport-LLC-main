import KhalidaImg from '../../assets/Images/khalidah-black-n-white2.png';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function AboutCEO() {
    const [activeSection, setActiveSection] = useState(1);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleSectionToggle = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="px-6 md:px-12 lg:px-36 pt-16 pb-16 font-sans">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-2/3 flex flex-col space-y-4" data-aos="fade-right">
                    <h3 className='text-2xl md:text-4xl mb-2 font-bold text-subHeading_2 '>
                        Black Woman in Business
                    </h3>
                    <button 
                        onClick={() => handleSectionToggle(1)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 1 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Trailblazing Entrepreneur</h3>
                        {activeSection === 1 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-text_1">
                                Khalidah Tunkara or better known as Leedah, is a trailblazing entrepreneur and the driving force behind Cutie Pie Transport LLC.
                                As a Black woman in the trucking industry, she has defied stereotypes and broken barriers,
                                establishing herself as a leader and visionary.
                            </p>
                        )}
                    </button>

                    <button 
                        onClick={() => handleSectionToggle(2)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 2 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Leadership & Vision</h3>
                        {activeSection === 2 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-text_1">
                                Under Khalidah's leadership, Cutie Pie Transport LLC has flourished, earning a reputation for reliability,
                                efficiency, and exceptional customer service. She believes in empowering her team and fostering a 
                                culture of inclusivity and respect.
                            </p>
                        )}
                    </button>

                    <button 
                        onClick={() => handleSectionToggle(3)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 3 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Advocacy & Representation</h3>
                        {activeSection === 3 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-text_1">
                                Khalidah's passion extends beyond business; she advocates for diversity and representation in the industry,
                                striving to create opportunities for other women and minorities in trucking.
                            </p>
                        )}
                    </button>
                </div>
                <div className="lg:w-1/3 relative" data-aos="fade-left">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
                        <img className="w-full" src={KhalidaImg} alt="Khalida" />
                        <div className="absolute inset-0 bg-primary opacity-15"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h2 className="text-lg font-bold text-white">Khalidah Tunkara</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


