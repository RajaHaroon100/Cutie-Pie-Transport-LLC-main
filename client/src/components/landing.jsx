import { Link } from "react-router-dom";

export default function Landing({ title }) {
    return (
        <div className="bg-primary shadow-md font-sans py-16 md:py-24">
            <div className="flex flex-col items-center">
                <div className="mb-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-heading_1 border-heading_1">{title}</h1>
                </div>
                <div className="flex flex-row text-base md:text-xl font-semibold text-heading_1 items-center">
                    <Link to={title === 'Full Truckload Quote' || title === 'Less Than Truckload Quote' || title === 'Drayage Quote' || title === 'Quote Confirmation' ? "/services" : "/"}>
                        <p className="hover:text-secondaryAccent">{title === 'Full Truckload Quote' || title === 'Less Than Truckload Quote' || title === 'Drayage Quote' || title === 'Quote Confirmation' ? "Services" : "Home"}</p>
                    </Link>
                    <p className="px-2 block">/</p>
                    <p className="text-secondaryAccent">{title}</p>
                </div>
                {title === 'Services' && (
                    <div className="flex flex-col md:flex-row gap-4 md:gap-x-8 mt-8">
                        <div>
                            <Link to="/quote">
                                <button className="animated-button w-full bg-secondary font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg">
                                    <span>Get a Quote</span>
                                </button>
                            </Link>
                        </div>

                        <div>
                            <Link to="/trackShipment">
                                <button className="animated-button w-full bg-secondary font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg">
                                    <span>Track Shipment</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


