import aboutusImg from '../../assets/Images/sunlight-truck.jpg'
import "../../App.css"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row items-center py-6 px-4 md:px-8 bg-primary rounded-lg shadow-md font-sans mx-4 md:mx-16 lg:mx-36 mb-8" data-aos="fade-up">
            <div className="w-full flex justify-center lg:justify-start mb-2 lg:mb-0" data-aos="fade-up">
                <img className="rounded-lg shadow-md max-w-full lg:max-w-lg" src={aboutusImg} alt="About Us" />
            </div>

            <div className=" flex flex-col items-start pt-4 md:pt-8 lg:py-4 lg:pl-12" data-aos="fade-up">
                <h2 className="text-2xl font-bold mb-4 md:mb-8 border-b-2 border-subHeading_1 text-subHeading_1">About Us</h2>
                <h1 className="text-3xl md:text-4xl font-bold pb-2 text-heading_1">Turning Every Shipment into a Sweet Experience</h1>
                <p className="text-text_1 font-semibold mb-6 text-justify">
                    At Cutie Pie Transport LLC, we’re dedicated to turning every shipment into a sweet experience. Our focus is
                    on adding a touch of care and precision to each delivery, ensuring that every package arrives safely and 
                    on time. We believe that logistics isn’t just about moving items—it’s about creating moments of joy and 
                    satisfaction for our clients. With our commitment to exceptional service, we aim to make every delivery 
                    feel like a delightful experience.
                </p>
                <ul className="checklist pl-5 text-text_1 font-semibold space-y-2 mb-6">
                    <li>Top Logistics</li>
                    <li>Secure Cargo</li>
                    <li>24/7 Support</li>
                    <li>Flexible Payment</li>
                </ul>

                <div className="w-full">
                    <Link to="/aboutUs">
                        <button className="animated-button bg-secondary font-semibold px-4 py-3 shadow-md rounded-lg">
                            <span>Learn More</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
