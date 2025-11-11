import Landing from '../../components/landing'
import CheckmarkSVG from '../../assets/SVGs/checkmark.svg'
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
    return (
    <div className='font-sans bg-bg'>
        <Landing title="Order Confirmation" />
        <div className='flex flex-col items-center py-12 md:py-24 text-secondary px-4'>
            <img className='w-16 md:w-24' src={CheckmarkSVG} alt="checkmark-svg" />
            <p className='mt-2 text-xl md:text-2xl font-semibold text-center'>Your order has been successfully placed.</p>
            <p className='w-full md:w-2/4 text-sm md:text-lg text-center mt-2'>
                Our team will contact you at the scheduled appointment time for further 
                details and final confirmation.
            </p>
            <Link to="/">
                <button className="px-4 md:px-6 py-3 mt-6 font-semibold rounded-lg shadow-md animated-button-orange bg-primary">
                    <span>Return Home</span>
                </button>
            </Link>
        </div>
    </div>
);

}
