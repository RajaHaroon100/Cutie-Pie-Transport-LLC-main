import { Link } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function BookLoad() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="bg-primary font-sans shadow-md py-8 md:py-16 mt-2 md:mt-8 mb-8 px-6 md:px-12 lg:px-36">
            <div className="flex flex-col items-center" data-aos="fade-up">
                <h1 className="text-2xl md:text-4xl text-heading_1 font-bold mb-4 text-center">
                    Book Your Load Now
                </h1>
                <div className="pt-1 md:pt-2">
                    <Link to="/quote">
                        <button className="animated-button bg-secondary font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg">
                            <span>Get a Quote</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
