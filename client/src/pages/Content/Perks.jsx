import bwTrucksImg from '../../assets/Images/black-white-trucks.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Perks() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return(
        <div className='py-12 px-6 md:px-12 lg:px-36 flex flex-col lg:flex-row items-center font-sans' data-aos="fade-up">
            <div className='lg:pr-12 w-full'>
                <div className='mb-8'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-heading_2 mb-4'>Your Best Opportunity in Freight Hauling Services</h2>
                    <p className='text-text_1 font-semibold text-justify'>
                        Welcome to Cutie Pie Transport LLC, your trusted partner in freight hauling services. We specialize in 
                        providing comprehensive and efficient hauling solutions to ensure your freight reaches its destination on time, 
                        every time.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row md:space-x-8 text-justify'>
                    <div className='mb-8 md:mb-0'>
                        <ul className='checklist-heading space-y-6'>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>24/7 Dispatching</h3>
                                    <p className='text-text_1'>
                                        Our dedicated team of dispatchers is available around the clock to manage and monitor
                                        your fleet, ensuring seamless operations.
                                    </p>
                                </div>
                            </li>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>Route Optimization</h3>
                                    <p className='text-text_1'>
                                        Utilizing advanced technology, we plan the most efficient routes to save time and reduce 
                                        fuel costs.
                                    </p>
                                </div>
                            </li>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>Load Matching</h3>
                                    <p className='text-text_1'>
                                        We find the best loads for your trucks, maximizing your capacity and profitability.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className='checklist-heading space-y-6'>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>Real-Time Tracking</h3>
                                    <p className='text-text_1'>
                                        Stay informed with real-time updates on the location and status of your shipments.
                                    </p>
                                </div>
                            </li>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>Driver Support</h3>
                                    <p className='text-text_1'>
                                        Our experienced support team is here to assist your drivers with any issues they encounter on the road.
                                    </p>
                                </div>
                            </li>
                            <li className='flex'>
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-heading_2'>Regulatory Compliance</h3>
                                    <p className='text-text_1'>
                                        We help you stay compliant with all industry regulations, ensuring smooth and hassle-free operations.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='hidden 2xl:flex xl:max-w-md w-full my-8 relative'>
                <img className='rounded-lg shadow-md w-full' src={bwTrucksImg} alt="truck-img"/>
                <div className="absolute inset-0 bg-primary opacity-15"></div>
            </div>
        </div>
    );
}
