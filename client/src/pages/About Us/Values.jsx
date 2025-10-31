import valuesImg from '../../assets/Images/worker-inspection.jpeg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function Values() {
    const [activeSection, setActiveSection] = useState(1);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleSectionToggle = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="px-6 md:px-12 lg:px-36 py-12 font-sans">
            <div className="flex flex-col lg:flex-row items-center gap-12">

                <div className="lg:w-2/3 flex flex-col space-y-4" data-aos="fade-right">
                    
                    <h3 className='text-2xl md:text-4xl mb-2 font-bold text-subHeading_2 '>
                        Our Values
                    </h3>
                    <button 
                        onClick={() => handleSectionToggle(1)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 1 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Integrity & Trust</h3>
                        {activeSection === 1 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-subHeading_1">
                                At Cutie Pie Transport LLC, integrity is at the heart of our operations. We are committed to conducting 
                                business with honesty and transparency, ensuring that our clients can trust us to deliver on our promises.
                            </p>
                        )}
                    </button>

                    <button 
                        onClick={() => handleSectionToggle(2)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 2 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Customer Focus</h3>
                        {activeSection === 2 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-subHeading_1">
                                We prioritize customer focus, striving to understand and meet the unique needs of each client. This 
                                drives us to continuously improve and adapt our services to exceed expectations.
                            </p>
                        )}
                    </button>

                    <button 
                        onClick={() => handleSectionToggle(3)} 
                        className={`text-left p-4 rounded-lg shadow-md transition duration-500 ${activeSection === 3 ? 'bg-primary text-white' : 'bg-accent text-gray-700'}`}
                    >
                        <h3 className="text-xl font-bold text-heading_1">Collaboration & Success</h3>
                        {activeSection === 3 && (
                            <p className="text-sm md:text-base mt-2 font-semibold text-justify text-text_1">
                                We value collaboration, working together as a cohesive team and building strong partnerships to achieve 
                                our shared goals and drive mutual success.
                            </p>
                        )}
                    </button>
                </div>
                
                <div className="lg:w-1/3 relative" data-aos="fade-left">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
                        <img className="w-full" src={valuesImg} alt="values-image" />
                        <div className="absolute inset-0 bg-primary opacity-15"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h2 className="text-lg font-bold text-white"></h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

