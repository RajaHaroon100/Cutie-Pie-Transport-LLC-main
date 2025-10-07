import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import ConfirmOrderSVG from '../../../assets/SVGs/confirm-order.svg';
import '../Order.css';
import axios from 'axios';
import { FaDotCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoadingModal } from './LoadingModal';

export default function ConfirmOrder({ personalDetails, appointmentDate, addresses, formData }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [truncatedElements, setTruncatedElements] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleMouseDown = (e, key) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    document.body.style.userSelect = 'none';
    containerRef.current = e.currentTarget;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const checkTruncation = (key, element) => {
      if (element) {
        const isTruncated = element.scrollWidth > element.clientWidth;
        setTruncatedElements(prevState => ({
          ...prevState,
          [key]: isTruncated,
        }));
      }
    };

    // Check truncation for all elements on mount and resize
    const elementsToCheck = ['fullName', 'email', 'company'];
    elementsToCheck.forEach(key => {
      checkTruncation(key, document.getElementById(key));
    });

    window.addEventListener('resize', () => {
      elementsToCheck.forEach(key => {
        checkTruncation(key, document.getElementById(key));
      });
    });

    return () => {
      window.removeEventListener('resize', () => {
        elementsToCheck.forEach(key => {
          checkTruncation(key, document.getElementById(key));
        });
      });
    };
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClick = async () => {
    setIsChecked(false);

    const dataToSend = {
      personalDetails,
      appointmentDate,
      addresses,
      formData,
    };
  
    setIsLoadingModalOpen(true);
    try {
      const response = await axios.post('/placeOrder', dataToSend);
      toast.success('Order Placed Successfully.');
      navigate('/orderConfirmation', {replace:true})
    } catch (error) {
      toast.error('Something Went Wrong! Try Again Later');
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  return (
    <div className='flex justify-center mb-8 font-sans'>
      <div className='flex flex-col w-full sm:w-2/3'>
        <div className='flex flex-col items-center mb-8'>
          <img className='mb-6 max-w-24 md:max-w-32' src={ConfirmOrderSVG} alt="order-svg" />
          <h2 className='text-3xl font-semibold text-heading_1 text-center'>
            Lock in Your <span className='text-heading_2'>Order</span>
          </h2>
        </div>

        <div className='cursor-default'>
          <h2>Personal Details</h2>
          <div className='p-4 my-2 border rounded-md border-secondary bg-bg'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-x-4'>
              <div>
                <p className='text-sm'>Full Name</p>
                <p
                  id="fullName"
                  ref={containerRef}
                  className={`font-semibold overflow-x-auto ${truncatedElements.fullName ? 'cursor-ew-resize' : ''} scrollbar-hidden`}
                  onMouseDown={(e) => handleMouseDown(e, 'fullName')}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {personalDetails.fullName}
                </p>
              </div>
              <div>
                <p className='text-sm'>Email</p>
                <p
                  id="email"
                  ref={containerRef}
                  className={`font-semibold overflow-x-auto ${truncatedElements.email ? 'cursor-ew-resize' : ''} scrollbar-hidden`}
                  onMouseDown={(e) => handleMouseDown(e, 'email')}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {personalDetails.email}
                </p>
              </div>
              <div>
                <p className='text-sm'>Company</p>
                <p
                  id="company"
                  ref={containerRef}
                  className={`font-semibold overflow-x-auto ${truncatedElements.company ? 'cursor-ew-resize' : ''} scrollbar-hidden`}
                  onMouseDown={(e) => handleMouseDown(e, 'company')}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {personalDetails.company === '' ? 'None' : personalDetails.company}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-4'>
              <div>
                <p className='text-sm'>Phone Number</p>
                <p className='font-semibold'>{personalDetails.phoneNumber}</p>
              </div>
              <div>
                <p className='text-sm'>Phone Extension</p>
                <p className='font-semibold'>{personalDetails.phoneExtension === '' ? 'None' : personalDetails.phoneExtension}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 cursor-default'>
          <h2>Appointment</h2>
          <div className='p-4 my-2 border rounded-md border-secondary bg-bg'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-x-4'>
              <div>
                <p className='text-sm'>Date</p>
                <p className='font-semibold'>{moment(appointmentDate.date).format('MMMM Do, YYYY')}</p>
              </div>
              <div>
                <p className='text-sm'>Time</p>
                <p className='font-semibold'>{appointmentDate.time}</p>
              </div>
              <div>
                <p className='text-sm'>Time Zone</p>
                <p className='font-semibold'>{appointmentDate.timeZone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 cursor-default'>
          <h2>Quote Details</h2>
          
          <div className='p-4 my-2 border rounded-md border-secondary bg-bg'>
            <div className='grid grid-cols-3 gap-x-4'>
              <div>
                <p className='text-sm'>Quote Type</p>
                <p className='font-semibold'>{formData.quoteType}</p>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-4 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-6'>
              <div className='col-span-2'>
                <p className='text-sm'>Equipment Type</p>
                <p className='font-semibold'>{formData.selectedEquipment}</p>
              </div>
              {formData.selectedEquipment === 'Temperature Controlled' && 
                <>
                  <div>
                    <p className='text-sm'>Min. Temperature</p>
                    <p className='font-semibold'>{formData.temperature.minTemp}&deg;F</p>
                  </div>
                  <div>
                    <p className='text-sm'>Max. Temperature</p>
                    <p className='font-semibold'>{formData.temperature.maxTemp}&deg;F</p>
                  </div>
                </>
              }  
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-6'>
              <div>
                <p className='text-sm'>Shipping From</p>
                <p className='font-semibold'>{formData.selectedShippingCountry}</p>
              </div>
              <div className='col-span-2'>
                <p className='text-sm'>Address</p>
                <p className='font-semibold'>{addresses.pickupAddress}, {formData.shippingAddress}</p>
              </div>
              {formData.quoteType === 'LTL' &&
                <div className='mt-2'>
                  <p className='text-sm'>Location Type</p>
                  <p className='font-semibold'>{formData.shippingLocationType}</p>
                </div>
              }
            </div>

            <div className='grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
              <div>
                <p className='text-sm'>Additional Shipping Location Details</p>
                <p className='font-semibold'>
                {formData.additionalShippingLocations.length > 0 
                  ? formData.additionalShippingLocations.join(' & ') 
                  : 'None'}
                </p>
              </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-6'>
              <div>
                <p className='text-sm'>Shipping To</p>
                <p className='font-semibold'>{formData.selectedDeliveryCountry}</p>
              </div>
              <div className='col-span-2'>
                <p className='text-sm'>Address</p>
                <p className='font-semibold'>{addresses.deliveryAddress}, {formData.deliveryAddress}</p>
              </div>
              {formData.quoteType === 'LTL' &&
                <div className='mt-2'>
                  <p className='text-sm'>Location Type</p>
                  <p className='font-semibold'>{formData.deliveryLocationType}</p>
                </div>
              }
            </div>

            <div className='grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
              <div>
                <p className='text-sm'>Additional Delivery Location Details</p>
                <p className='font-semibold'>
                {formData.additionalDeliveryLocations.length > 0 
                  ? formData.additionalDeliveryLocations.join(' & ') 
                  : 'None'}
                </p>
              </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-6'>
              <div>
                <p className='text-sm'>Pickup Date</p>
                <p className='font-semibold'>{moment(formData.pickupDate).format('MMMM Do, YYYY')}</p>
              </div>
              <div>
                <p className='text-sm'>Delivery Date</p>
                <p className='font-semibold'>{moment(formData.deliveryDate).format('MMMM Do, YYYY')}</p>
                <p className='text-xs text-amber-700'>To be confirmed by our team.</p>
              </div>
              <div>
                <p className='text-sm'>Distance</p>
                <p className='font-semibold'>{formData.distance.toFixed(0)} Miles</p>
              </div>
            </div>

            <div className='grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
              <div>
                <p className='text-sm'>Additional Services</p>
                <p className='font-semibold'>
                  {formData.additionalServices.length > 0 
                    ? formData.additionalServices.join(', ') 
                    : 'None'}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
              <div>
                <p className='text-sm'>Items</p>
                <div className='font-semibold'>
                  {formData.items.length > 0 
                    ? formData.items.map((item, index) => (
                        <div key={index} className='flex items-center mb-2'>
                          <FaDotCircle className='mr-2 max-w-2 text-text_1'/> {item.description + ": "}
                          {item.numPallets + " "} 
                          {(item.packaging === 'Pallet (48"x40")' || item.packaging === 'Pallet (48"x48")' || item.packaging === 'Pallet (Custom Dimensions)') ? 
                              "Pallets" 
                              : 
                              (item.packaging === 'Box' ? 
                                  "Boxes" 
                                  : 
                                  item.packaging + "s"
                              )
                          }, {item.weight} pounds
                        </div>
                      ))
                    : 'None'}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-y-2 sm:gap-x-6'>
              <div>
                <p className='text-sm'>Shipment Weight</p>
                <p className='font-semibold'>{(formData.TRAILER_CONFIG.maxWeight - formData.availableWeight).toFixed(2)} Pounds</p>
              </div>
              <div>
                <p className='text-sm'>Shipment Volume</p>
                <p className='font-semibold'>{(((formData.TRAILER_CONFIG.length * formData.TRAILER_CONFIG.width * formData.TRAILER_CONFIG.height) - formData.availableVolume)/1728).toFixed(2)} Cubic Meter</p>
              </div>
            </div>

            {formData.quoteType === 'LTL' && 
              <div className='grid grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
                <div>
                  <p className='text-sm'>Shipment Freight Class</p>
                  <p className='font-semibold'>{formData.shipmentFreightClass}</p>
                </div>
              </div>
            }
            

            <div className='grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6'>
              <div>
                <p className='text-sm'>Quote Price</p>
                <p className='font-semibold'>{formData.quotePrice} USD</p>
              </div>
            </div>
          </div>
        </div>

        <p className='text-sm italic text-amber-800'>To modify any quote details, please initiate a new quote before proceeding with your order.</p>
        
        <div className='mt-8'>
          <div className='flex items-center mb-2'>
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={handleCheckboxChange}
              className='w-4 h-4 border rounded-sm appearance-none min-w-4 bg-accent text-primary border-secondary hover:border-heading_2 checked:bg-primary focus:outline-none focus:ring-primary focus:ring-1'
            />
            <label className='ml-2 text-sm text-text_1'>I certify that all provided information is accurate. Cutie Pie Transport, LLC reserves the right to cancel the order or adjust pricing for any discrepancies.</label>
          </div>
          <button
              onClick={handleClick}
              className={`w-full py-2 px-4 ${!isChecked? "bg-gray-400" : "bg-primary animated-button-orange"} text-text_1 rounded-lg`}
              disabled={!isChecked}
          >
              <span className='font-semibold'>Place Order</span>
          </button>
        </div>

      </div>

      <LoadingModal isOpen={isLoadingModalOpen} />
    </div>
  );
}
