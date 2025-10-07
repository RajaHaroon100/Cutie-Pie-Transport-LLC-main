import React from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AmericanExpressPNG from '../../assets/Images/american-express.png';
import VisaPNG from '../../assets/Images/visa.png';
import MastercardPNG from '../../assets/Images/mastercard.png';
import DiscoverPNG from '../../assets/Images/discover.png';
import SquareLogoPNG from '../../assets/Images/square-logo.png'
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

export default function SquarePayment({ order }) {
  const navigate = useNavigate();

  const cardProcessingFee = (order.formData.quotePrice * 0.029).toFixed(2);
  const totalAmount = (parseFloat(order.formData.quotePrice) + parseFloat(cardProcessingFee)).toFixed(2);

  const handleTokenReceived = async (token) => {
    try {
      const response = await axios.post('/payment/square', {
        sourceId: token.token,
        orderId: order._id,
        trackingId: order.trackingId,
        amount: totalAmount,
      });
      if (response.status === 200) {
        const data = order;
        navigate('/payment-success', { replace: true, state: { data, totalAmount } });
        toast.success('Payment successful!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  return (
    <div className="font-sans my-4 p-4 sm:p-6 md:p-8 bg-bg rounded-lg shadow-sm text-subHeading_1">
      <h2 className="text-xl sm:text-2xl font-semibold text-heading_1">Complete Your Purchase Securely</h2>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
        <div className="flex flex-col justify-between pr-0 md:pr-4 md:border-r border-gray-400">
          <p className="text-sm sm:text-base text-text_1">
            Please fill out your payment details to finalize your purchase. 
            All transactions are securely processed.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 mt-4">
            <div>
              <p className="text-xs sm:text-sm text-text_1">Pickup Address</p>
              <p className="text-subHeading_1 font-semibold text-xs sm:text-sm md:text-base">
                {`${order.formData.shippingAddress}, ${order.formData.selectedShippingCountry}`}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-text_1">Delivery Address</p>
              <p className="text-subHeading_1 font-semibold text-xs sm:text-sm md:text-base">
                {`${order.formData.deliveryAddress}, ${order.formData.selectedDeliveryCountry}`}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-text_1">Estimated Delivery Date</p>
              <p className="text-subHeading_1 font-semibold text-xs sm:text-sm md:text-base">
                {moment(order.formData.deliveryDate).format("MMMM Do, YYYY")}
              </p>
            </div>
          </div>

          <div className='my-4 md:my-0'>
            <div className='flex items-center justify-between'>
              <p className='text-text_1 text-xs md:text-sm'>Order Price</p>
              <p className="text-subHeading_1 font-semibold text-sm md:text-base">
                ${order.formData.quotePrice}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-text_1 text-xs md:text-sm'>Card Processing Fee</p>
              <p className="text-subHeading_1 font-semibold text-sm md:text-base">
                ${cardProcessingFee}
              </p>
            </div>
            <div className='flex items-center justify-between border-y my-1 py-1 border-subHeading_1'>
              <p className='text-text_1 text-sm'>Total Price</p>
              <p className="text-subHeading_1 font-semibold">
                ${totalAmount}
              </p>
            </div>
          </div>
        </div>
  
        <div className="mt-4 md:mt-0">
          <p className="flex items-center mb-4 sm:mb-8 text-sm sm:text-base text-subHeading_1">
            Pay<strong className="mx-1">${totalAmount} USD</strong> by SquareUp
            <img className="ml-2 h-4" src={SquareLogoPNG} alt="square" />
          </p>
  
          <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
            <img className="h-3" src={VisaPNG} alt="visa" />
            <img className="h-4" src={MastercardPNG} alt="mastercard" />
            <img className="h-3" src={AmericanExpressPNG} alt="american-express" />
            <img className="h-2" src={DiscoverPNG} alt="discover" />
          </div>
  
          <div>
            <PaymentForm
              applicationId={import.meta.env.VITE_SQUARE_APPLICATION_ID}
              cardTokenizeResponseReceived={handleTokenReceived}
              locationId={import.meta.env.VITE_SQUARE_LOCATION_ID}
            >
              <CreditCard
                buttonProps={{
                  css: {
                    backgroundColor: "#f97316",
                    fontSize: "14px",
                    color: "#1f2937",
                    "&:hover": {
                      backgroundColor: "#111827",
                      color: "#fff",
                    },
                  },
                }}
              />
            </PaymentForm>
          </div>
  
          <p className="italic text-xs sm:text-sm text-text_1 mt-2">
            We use end-to-end encryption to protect your information. 
            Your payment is safe with SquareUp.
          </p>
        </div>
        
      </div>
      <p className="italic mt-8 text-xs sm:text-sm text-text_1 text-center">
        Need help? 
        <Link to={'/contactUs'}><span className='underline hover:text-heading_2'> Contact our support team.</span></Link>
      </p>
    </div>
  );  
}
