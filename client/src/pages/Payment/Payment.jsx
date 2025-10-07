import { useState } from 'react';
import Landing from "../../components/landing";
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import ZelleForm from "./ZelleForm";
import SquarePaymentForm from "./SquarepayForm";
import PaymentSVG from '../../assets/SVGs/payment-card.svg';
import ZelleLogoPNG from '../../assets/Images/zelle-logo.png'
import SquareLogoPNG from '../../assets/Images/square-logo.png'

export default function Payment() {
    const location = useLocation();
    const orderData = location.state;
    const order = orderData ? orderData.order : null;

    const [selectedPayment, setSelectedPayment] = useState('square');

    const handleZelleChange = () => {
        setSelectedPayment('zelle');
    };

    const handleSquareChange = () => {
        setSelectedPayment('square');
    };

    return (
        <div className="bg-bg pb-24 font-sans">
            <Landing title="Order Payment" />
            <div className="mx-4 sm:mx-12 md:mx-36 bg-accent p-4 sm:p-6 md:p-8 mt-12 sm:mt-16 md:mt-24 rounded-lg">
                <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
                    <img className="w-24 sm:w-28 md:w-32 mb-4 sm:mb-5 md:mb-6" src={PaymentSVG} alt="item-svg" />
                    <h2 className="text-2xl sm:text-3xl text-heading_1 font-semibold">
                        <span className="text-heading_2">Secure </span> Your Spot
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-subHeading_1">
                        <span className="text-red-500 text-xl">*</span> Indicates a required field
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <div>
                        <p className="text-xs sm:text-sm text-text_1">Pickup Address</p>
                        <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{`${order.formData.shippingAddress}, ${order.formData.selectedShippingCountry}`}</p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-text_1">Delivery Address</p>
                        <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{`${order.formData.deliveryAddress}, ${order.formData.selectedDeliveryCountry}`}</p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-text_1">Estimated Delivery Date</p>
                        <p className="text-subHeading_1 font-semibold text-sm sm:text-base">{moment(order.formData.deliveryDate).format("MMMM Do, YYYY")}</p>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-text_1">Order Price</p>
                        <p className="text-subHeading_1 font-semibold text-sm sm:text-base">${order.formData.quotePrice}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center mb-6 sm:mb-8">
                    <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-subHeading_1">Payment Method</h2>
                    <div className="border-y py-2 border-orange-600">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedPayment === 'square'}
                                onChange={handleSquareChange}
                                className="w-4 h-4 min-w-4 appearance-none bg-accent text-primary border border-primary rounded-full checked:bg-primary focus:outline-none focus:ring-primary focus:ring-2"
                            />
                            <p className="text-text_1 ml-2">Card Pay by Square</p>
                            <img className="w-4 ml-1" src={SquareLogoPNG} alt="square-logo" />
                        </label>
                        <div className="flex justify-center">
                            {selectedPayment === 'square' && <SquarePaymentForm order={order} />}
                        </div>
                    </div>
                    <div className="border-b py-2 border-orange-600">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedPayment === 'zelle'}
                                onChange={handleZelleChange}
                                className="w-4 h-4 min-w-4 appearance-none bg-accent text-primary border border-primary rounded-full checked:bg-primary focus:outline-none focus:ring-primary focus:ring-2"
                            />
                            <p className="text-text_1 ml-2">Zelle</p>
                            <img className="w-6 ml-1" src={ZelleLogoPNG} alt="zelle-logo" />
                        </label>
                        <div className="flex justify-center">
                            {selectedPayment === 'zelle' && <ZelleForm order={order} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
