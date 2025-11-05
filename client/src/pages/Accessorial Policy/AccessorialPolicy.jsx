import React, { useEffect, useState } from "react";
import axios from "axios";
import AccessorialPolicyText from "./AccessorialPolicyText";
import Landing from "../../components/landing";
import HandShakeSVG from "../../assets/SVGs/handshake-brokerage.svg";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AccessorialPolicy = () => {
    const [date, setDate] = useState("");
    const [ip, setIp] = useState("");
    const [signed, setSigned] = useState("");
    const [ipData, setIpData] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setDate(currentDate);
    }, []);

    useEffect(() => {
        axios
            .get(
                "https://api.ipgeolocation.io/ipgeo?apiKey=3301efe704a24c8ba995023407dd2e35"
            ) // Replace with your API key
            .then((response) => {
                setIp(response.data.ip);
                setIpData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching IP address:", error);
            });
    }, []);

    useEffect(() => {
        setButtonDisabled(signed.trim() === "");
    }, [signed]);

    const handleSignedChange = (e) => {
        setSigned(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { signed, date, ip, ipData };

        setButtonDisabled(true);

        axios
            .post("/submit/ip-agreement", formData)
            .then((response) => {
                navigate('/');
                toast.success("Signed Agreement Sent.");
            })
            .catch((error) => {
                toast.error("Something went wrong. Try again later.");
            })
            .finally(() => {
                setButtonDisabled(false);
            });
    };

    return (
        <div className="bg-bg font-sans pb-16">
            <Landing title="Accessorial Policy" />
            <div className="mt-16 mx-4 md:mx-12 lg:mx-24 xl:mx-36">
                <div className="bg-accent py-8 px-6 sm:py-10 sm:px-12 md:py-12 md:px-14 rounded-lg shadow-sm">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            className="w-16 sm:w-20 md:w-28"
                            src={HandShakeSVG}
                            alt="hand shake svg"
                        />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-heading_1 mt-4 text-center">
                            IP Signed <span className="text-heading_2">Agreement</span>
                        </h2>
                        <p className="text-center w-full sm:w-3/4 md:w-2/3 text-text_1 mt-2">
                            By agreeing and submitting this form, you confirm that you prefer
                            to place your order via a phone call rather than through our
                            online system.
                        </p>
                    </div>

                    <AccessorialPolicyText />

                    <div className="flex justify-center md:justify-end">
                        <form
                            className="w-full sm:w-3/4 md:w-1/2 flex flex-col gap-y-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 items-center space-y-2 md:space-y-0 md:space-x-4">
                                <label className="text-lg sm:text-xl font-semibold text-subHeading_1 md:col-span-1">
                                    Signed
                                </label>
                                <input
                                    type="text"
                                    value={signed}
                                    onChange={handleSignedChange}
                                    className="px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:col-span-2"
                                    placeholder="Your signature"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 items-center space-y-2 md:space-y-0 md:space-x-4">
                                <label className="text-lg sm:text-xl font-semibold text-subHeading_1 md:col-span-1">
                                    Date
                                </label>
                                <input
                                    type="text"
                                    value={date}
                                    className="px-3 py-2 border border-gray-200 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:col-span-2"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 items-center space-y-2 md:space-y-0 md:space-x-4">
                                <label className="text-lg sm:text-xl font-semibold text-subHeading_1 md:col-span-1">
                                    IP Address
                                </label>
                                <input
                                    type="text"
                                    value={ip}
                                    className="px-3 py-2 border border-gray-200 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:col-span-2"
                                    disabled
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full mt-2 py-3 font-semibold rounded-lg shadow-md  ${buttonDisabled
                                        ? "bg-gray-400"
                                        : "bg-primary animated-button-orange"
                                    }`}
                                disabled={buttonDisabled}
                            >
                                <span>I Agree</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessorialPolicy;

