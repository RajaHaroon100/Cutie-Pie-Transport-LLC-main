import '../../App.css';
import { Link } from 'react-router-dom';

export default function Card({ mapper, image, link, title, description }) {
    return (
        <div className="animated-card flex flex-col justify-between bg-[#978d91] border-b-8 border-primary p-4 md:p-8 rounded-lg shadow-md font-sans">
            <span>
                <img className="w-full max-w-24 object-cover rounded-t-lg mx-auto" src={image} alt="service-img" />
                <h3 className="text-xl md:text-2xl font-semibold text-heading_1 mt-4 text-center">{title}</h3>
                <p className="text-sm md:text-base text-text_1 mt-2 text-center">{description}</p>
            </span>
            {mapper === 'modes' && (
                <div className='pt-4 flex justify-center'>
                    <Link to={link}>
                        <button className="animated-button bg-secondary font-semibold px-4 py-2 md:px-4 md:py-3 shadow-md rounded-lg">
                            <span>Request Quote</span>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

