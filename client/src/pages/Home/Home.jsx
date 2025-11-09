import AboutUs from '../Content/AboutUs.jsx'
import Perks from '../Content/Perks.jsx'
import Advantages from '../Content/Advantages.jsx'
import AboutServices from '../Content/AboutServices.jsx'
import AboutCompany from '../Content/AboutCompany.jsx'
import Testimonial from '../Content/Testimonial.jsx'
import Services from '../Content/ServicesMapper.jsx'
import Modes from '../Content/ModesMapper.jsx'
import LandingContent from './LandingHome.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
 
export default function Home() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='bg-bg pb-12'>
            <LandingContent />
            <AboutUs />
            <Perks />

            <div className='flex justify-center pt-12 pb-8' data-aos="fade-up">
                <h3 className='text-heading_2 font-semibold text-2xl font-sans border-b-2 border-subHeading_2'>What We Do?</h3>
            </div>

            <Advantages />
            <Services />
            <Modes />
            <AboutServices />
            <AboutCompany />
            <Testimonial />
        </div>
    );
}
