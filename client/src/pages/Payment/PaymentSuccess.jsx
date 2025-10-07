import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import moment from 'moment';
import Landing from "../../components/landing";
import PaymentSuccessfulSVG from "../../assets/SVGs/payment-successful.svg"
import LogoPNG from "../../assets/Images/logo.png"

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, totalAmount } = location.state;
  const receiptRef = useRef();

  const handleScreenshot = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'Payment Receipt-Cutie Pie Transport LLC.png';
    link.click();
  };

  return (
    <div className="bg-bg font-sans">
      <Landing title="Payment Successful" />
      <div className="font-sans mx-4 sm:mx-12 lg:mx-36 my-8 sm:my-16 p-6 sm:p-8 bg-accent rounded-lg shadow-md">
        <div className="flex flex-col justify-center items-center mb-8">
          <img className="w-20 sm:w-28" src={PaymentSuccessfulSVG} alt="payment-success-svg" />
          <h1 className="text-xl sm:text-3xl text-heading_1 font-semibold text-center mb-4">
            Your spot has been <span className="text-heading_2">secured</span>.
          </h1>
        </div>

        <div ref={receiptRef} className="relative bg-bg p-4 sm:p-6 rounded-lg shadow-sm">
          <div 
            className="absolute inset-0 bg-no-repeat bg-center bg-contain sm:bg-auto opacity-5"
            style={{ backgroundImage: `url(${LogoPNG})`, zIndex: '0' }}
          ></div>

          <div className='relative z-10'>
            <div className="text-center mb-4">
              <h2 className='font-bold text-lg md:text-3xl text-heading_2'>Cutie Pie Transport LLC</h2>
              <h2 className="text-lg sm:text-2xl font-semibold text-subHeading_1">Payment Receipt</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Generated At: <span className="font-semibold">{moment().format('MMMM Do, YYYY; hh:mm A')}</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Order Id: <span className="font-semibold">CPT-{data.trackingId}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Total Amount Paid */}
              <div className="col-span-2 text-center mb-4">
                <p className="text-xs sm:text-sm text-gray-600">Total Amount Paid</p>
                <p className="text-base sm:text-xl font-semibold text-gray-900">${totalAmount} USD</p>
              </div>

              {/* Customer Name */}
              <div className="col-span-2 border-y py-2">
                <p className="text-xs sm:text-sm text-gray-600">Customer Name</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">{data.personalDetails.fullName}</p>
              </div>

              {/* Pickup Address */}
              <div className="border-b py-2 col-span-2 md:col-span-1">
                <p className="text-xs sm:text-sm text-gray-600">Pickup Address</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {`${data.formData.shippingAddress}, ${data.formData.selectedShippingCountry}`}
                </p>
              </div>

              {/* Delivery Address */}
              <div className="border-b py-2 col-span-2 md:col-span-1">
                <p className="text-xs sm:text-sm text-gray-600">Delivery Address</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {`${data.formData.deliveryAddress}, ${data.formData.selectedDeliveryCountry}`}
                </p>
              </div>

              {/* Estimated Delivery Date */}
              <div className="py-2 col-span-2">
                <p className="text-xs sm:text-sm text-gray-600">Estimated Delivery Date</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {moment(data.formData.deliveryDate).format('MMMM Do, YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleScreenshot}
            className="w-full sm:w-1/2 lg:w-1/4 py-3 font-semibold bg-primary text-secondary rounded-md shadow hover:bg-secondary hover:text-white transition"
          >
            Take Screenshot of Receipt
          </button>
        </div>

        {/* Back to Dashboard Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/trackShipment')}
            className="w-full sm:w-1/2 lg:w-1/4 py-3 font-semibold bg-secondary text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            Back to Tracking
          </button>
        </div>
      </div>
    </div>
  );
}
