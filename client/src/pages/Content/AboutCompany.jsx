import trucksImg from '../../assets/Images/company-trucks.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AboutCompany() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='py-8 md:py-16 px-6 sm:px-12 md:px-24 lg:px-36 flex flex-col lg:flex-row items-center font-sans'>
            <div className='relative max-w-md w-full my-8 lg:my-0 flex' data-aos="fade-up">
                <img className='rounded-lg shadow-md w-full h-auto' src={trucksImg} alt="company-img" />
                <div className="absolute inset-0 bg-primary opacity-15 rounded-lg"></div>
            </div>
            <div className='lg:pl-8 flex flex-col items-start w-full' data-aos="fade-up">
                <h3 className='text-xl md:text-2xl mb-4 font-bold border-b-2 text-subHeading_2 border-subHeading_2'>
                    About Company
                </h3>
                <h1 className='text-3xl md:text-4xl font-bold text-heading_2 mb-4'>
                    Cutie Pie Transport LLC Services
                </h1>
                <p className='text-sm md:text-base lg:text-lg font-semibold text-text_1 text-justify pb-2'>
                    What sets Cutie Pie Transport LLC apart from our competitors is our cost-effective services. 
                    We've crafted plans to suit various needs and budgets, eliminating the hassle of paying 10% 
                    or more to freight hauling services for every load. Our freight hauling services have gained 
                    global popularity for all hauling needs. But that’s not all... If you need a customized plan 
                    beyond our standard offerings, contact us to discuss your specific requirements.
                </p>
                <p className='text-sm md:text-base lg:text-lg font-semibold text-text_1 text-justify'>
                    Many frustrations can arise, such as trucks stuck at truck stops, searching load boards, dealing 
                    with brokers offering cheap freight, waiting for emails, and paying for copies and taxes. At Cutie 
                    Pie Transport LLC, we handle all these issues so you can focus on your business without the hassle.
                </p>
            </div>
        </div>
    );
}
