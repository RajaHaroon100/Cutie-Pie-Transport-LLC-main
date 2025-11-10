import { useState, useEffect } from 'react';
import LocationsConfirmationSVG from '../../../assets/SVGs/locations-confirmation.svg';

export default function ConfirmAddresses({ onAddressesChange, addresses }) {
    const [pickupAddress, setPickupAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    useEffect(() => {
        onAddressesChange({ pickupAddress, deliveryAddress });
    }, [pickupAddress, deliveryAddress]);

    useEffect(() => {
        if (addresses.pickupAddress != '') {
            setPickupAddress(addresses.pickupAddress);
        }
        if (addresses.deliveryAddress != '') {
            setDeliveryAddress(addresses.deliveryAddress);
        }
    }, []);

    return (
        <div className="flex justify-center mb-8 font-sans">
            <div className="flex flex-col w-full sm:w-2/3 px-4">
                <div className="flex flex-col items-center text-center">
                    <img className="max-w-24 md:max-w-32" src={LocationsConfirmationSVG} alt="calendar-svg" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-heading_1">
                        Let's finalize your <span className="text-heading_2">addresses</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-subHeading_1">
                        <span className="text-xl text-red-500">*</span> Indicates a required field
                    </p>
                </div>

                <form className='mt-12'>
                    <div className="mb-4">
                        <p className="mb-2 text-text_1" htmlFor="pickupAddress">
                            Pickup Address <span className="text-red-500">*</span>
                        </p>
                        <input
                            id="pickupAddress"
                            type="text"
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={pickupAddress}
                            onChange={(e) => setPickupAddress(e.target.value)}
                            placeholder='e.g. 123 House, Main St'
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <p className="mb-2 text-text_1" htmlFor="deliveryAddress">
                            Delivery Address <span className="text-red-500">*</span>
                        </p>
                        <input
                            id="deliveryAddress"
                            type="text"
                            className="w-full px-3 py-2 border border-black rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder='e.g. Building, Town'
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

