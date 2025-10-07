import globeSvg from '../../assets/SVGs/globe.svg';
import shieldSvg from '../../assets/SVGs/shield.svg';
import clockSvg from '../../assets/SVGs/clock.svg';
import calendarSvg from '../../assets/SVGs/calendar.svg';
import creditCardSvg from '../../assets/SVGs/credit-card.svg';
import navigateSvg from '../../assets/SVGs/navigate.svg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Advantages() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return(
        <div className='py-6 px-4 md:px-12 bg-primary rounded-lg shadow-md font-sans mx-4 md:mx-32 mb-16' data-aos="fade-up">
            <h1 className='text-2xl md:text-4xl font-bold text-heading_1 text-center pt-4 pb-8 md:pb-12' data-aos="fade-up">Our Advantages</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6' data-aos="fade-up">
                <div className='pr-2'>
                    <img className='w-16 md:w-24 pb-4' src={globeSvg} alt='globe-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>Best Logistics</h2>
                    <p className='text-sm md:text-base text-text_1'>We provide the best logistic service on the market, all over the globe.</p>
                </div>

                <div className='pr-2'>
                    <img className='w-16 md:w-24 pb-4' src={shieldSvg} alt='shield-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>Cargo Security</h2>
                    <p className='text-sm md:text-base text-text_1'>Our clients get 100% guarantee for secure shipping & handling.</p>
                </div>

                <div>
                    <img className='w-16 md:w-24 pb-4' src={clockSvg} alt='clock-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>24-Hour Support</h2>
                    <p className='text-sm md:text-base text-text_1'>In case you have an enquiry, or an urgent question, our support is there.</p>
                </div>

                <div className='pr-2'>
                    <img className='w-16 md:w-24 pb-4' src={calendarSvg} alt='calendar-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>On-Time Delivery</h2>
                    <p className='text-sm md:text-base text-text_1'>We know how to make it in time and set the right terms for deliveries.</p>
                </div>

                <div className='pr-2'>
                    <img className='w-16 md:w-24 pb-4' src={creditCardSvg} alt='credit-card-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>Any Payment Method</h2>
                    <p className='text-sm md:text-base text-text_1'>All payment methods are acceptable for ordering our services.</p>
                </div>

                <div>
                    <img className='w-16 md:w-24 pb-4' src={navigateSvg} alt='navigation-img'/>
                    <h2 className='text-xl md:text-2xl text-heading_1 font-semibold'>Cargo Tracking</h2>
                    <p className='text-sm md:text-base text-text_1'>Cargo tracking allows for better route optimization, reducing fuel consumption and transportation costs.</p>
                </div>
            </div>
        </div>
    )
}
