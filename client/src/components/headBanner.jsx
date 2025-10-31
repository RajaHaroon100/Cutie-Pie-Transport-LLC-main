import { Link } from "react-router-dom";

export default function HeadBanner() {
    return (
        <>
            <div className="bg-secondary text-white py-2 px-4 md:px-20 lg:px-44 shadow-md font-sans">
                <div className="flex justify-end space-x-4 text-sm md:text-base">
                    <Link to="/quote" className="hover:underline">Get A Quote</Link>
                    <p>|</p>
                    <Link to="/trackShipment" className=" hover:underline">Track Shipment</Link>
                    <p>|</p>
                    <Link to="/login" className="hover:underline">Admin LogIn</Link>
                </div>
            </div>
        </>
    );
}

