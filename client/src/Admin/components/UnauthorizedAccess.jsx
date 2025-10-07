import { Link } from "react-router-dom";
import dangerSVG from '../../assets/SVGs/danger.svg'

export default function UnauthorizedAccess() {
    return (
        <div className="min-h-screen bg-red-700 text-secondary font-sans h-screen flex flex-col justify-center items-center font-semibold">
            <img className="w-24 mb-2" src={dangerSVG} alt="" />
            <p className="text-2xl">Unauthorized Access Detected!</p>
            <p className="text-xl pt-8">If you think it was by mistake. Try <strong>Log In</strong> agian.</p>
            <Link to="/login">
                <button className="mt-4 bg-secondary hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
                    Log In
                </button>
            </Link>
        </div>
    );
}