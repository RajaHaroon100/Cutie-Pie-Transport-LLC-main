import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaPlus } from 'react-icons/fa';

import locationSvg from '../../assets/SVGs/location-colored.svg';
import boxSvg from '../../assets/SVGs/shipment-box.svg';
import groupSvg from '../../assets/SVGs/group-person.svg';
import calendarSvg from '../../assets/SVGs/calendar-colored.svg';

export default function AboutServices() {
    const [startCounter, setStartCounter] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                setStartCounter(true);
            }
        }
    });

    return (
        <div className="bg-primary font-sans shadow-md py-16 mt-16 mb-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-heading_1 mb-4 text-center">
                    About <span className="text-orange-50">Cutie Pie Transport LLC</span> Services
                </h1>
                <p className="font-semibold text-text_1 text-center">
                    Statistics prove that we are 100% devoted to our job of managing 
                    the orders across the USA with minimum effort for our clients!
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center" ref={ref}>
                    {startCounter && (
                        <div>
                            <div className="flex justify-center items-center text-2xl">
                                <img className="max-w-8 mr-2" src={locationSvg} alt="location-svg" />
                                <CountUp start={0} end={48} duration={3} className="text-4xl font-bold text-heading_1" />
                                <FaPlus className="inline-block mb-2 text-heading_1" />
                            </div>
                            <p className="text-subHeading_1 mt-2">Connected All States</p>
                        </div>
                    )}
                </div>

                <div className="text-center" ref={ref}>
                    {startCounter && (
                        <div>
                            <div className="flex justify-center items-center text-2xl">
                                <img className="max-w-8 mr-2" src={boxSvg} alt="box-svg" />
                                <CountUp start={0} end={1863} duration={3} className="text-4xl font-bold text-heading_1" />
                                <FaPlus className="inline-block mb-2 text-heading_1" />
                            </div>
                            <p className="text-subHeading_1 mt-2">Closed Shipments</p>
                        </div>
                    )}
                </div>

                <div className="text-center" ref={ref}>
                    {startCounter && (
                        <div>
                            <div className="flex justify-center items-center text-2xl">
                                <img className="max-w-8 mr-2" src={groupSvg} alt="group-svg" />
                                <CountUp start={0} end={1791} duration={3} className="text-4xl font-bold text-heading_1" />
                                <FaPlus className="inline-block mb-2 text-heading_1" />
                            </div>
                            <p className="text-subHeading_1 mt-2">Satisfied Clients</p>
                        </div>
                    )}
                </div>

                <div className="text-center" ref={ref}>
                    {startCounter && (
                        <div>
                            <div className="flex justify-center items-center text-2xl">
                                <img className="max-w-8 mr-2" src={calendarSvg} alt="calendar-svg" />
                                <CountUp start={0} end={9} duration={3} className="text-4xl font-bold text-heading_1" />
                                <FaPlus className="inline-block mb-2 text-heading_1" />
                            </div>
                            <p className="text-subHeading_1 mt-2">Years of Experience</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
