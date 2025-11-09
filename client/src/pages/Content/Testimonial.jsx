import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from '@react-spring/web';
import { TESTIMONIALS } from "./data";
import Comment from './Comment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Testimonial.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Testimonial() {
    const [current, setCurrent] = useState(0);
    const length = TESTIMONIALS.length;

    const nextTestimonial = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevTestimonial = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Configure transitions
    const transitions = useTransition(current, {
        keys: current,
        from: {
            opacity: 0,
            transform: 'scale(0.5) translateX(100%)',
        },
        enter: {
            opacity: 1,
            transform: 'scale(1) translateX(0%)',
        },
        leave: {
            opacity: 0,
            transform: 'scale(0.5) translateX(-100%)',
        },
        config: config.gentle,
    });

    return (
        <div className='pt-8 pb-16 lg:pb-24 font-sans bg-primary rounded-lg shadow-md mx-4 sm:mx-8 md:mx-12 lg:mx-36 my-8 lg:my-16' data-aos="fade-up">
            <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-36" data-aos="fade-up">
                <h3 className='text-xl sm:text-2xl mb-4 sm:mb-8 font-bold border-b-2 text-subHeading_1 border-subHeading_1'>
                    Testimonial
                </h3>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-center font-bold text-heading_1 mb-4'>
                    What Our Clients Say
                </h1>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 md:px-12 lg:px-28" data-aos="fade-up">
                <button
                    onClick={prevTestimonial}
                    className="border-2 border-secondary hover:bg-secondary hover:text-white text-secondary font-bold py-2 sm:py-4 px-2 sm:px-4 rounded-full mb-4 lg:mb-0 lg:mr-4"
                >
                    <FaArrowLeft />
                </button>

                <div className='w-full md:min-w-full max-w-3xl comment-wrapper'>
                    {transitions((styles, item) => (
                        <animated.div className='comment' style={styles}>
                            <Comment {...TESTIMONIALS[item]} />
                        </animated.div>
                    ))}
                </div>

                <button
                    onClick={nextTestimonial}
                    className="border-2 border-secondary hover:bg-secondary hover:text-white text-secondary font-bold py-2 sm:py-4 px-2 sm:px-4 rounded-full mt-4 lg:mt-0 lg:ml-4"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

