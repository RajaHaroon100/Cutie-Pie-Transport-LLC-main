import React, { useEffect, useState } from 'react';
import { Clipboard } from 'lucide-react';
import QRCodeImg from '../../assets/Images/zelle-qr-code.png';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function ZelleForm({ order }) {
    const [formData, setFormData] = useState({
        amount: order.formData.quotePrice,
        name: 'Khalidah Tunkara',
        email: 'leedah@gmail.com',
        phone: '770-572-5863'
    });

    const [contactInfo, setContactInfo] = useState('');

    const copyToClipboard = (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    toast.success('Copied to clipboard!');
                })
                .catch(err => {
                    toast.error('Failed to copy to clipboard');
                });
        } else if (window.clipboardData) {
            window.clipboardData.setData('Text', text);
            toast.success('Copied to clipboard!');
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                toast.success('Copied to clipboard!');
            } catch (err) {
                toast.error('Failed to copy to clipboard');
            }

            document.body.removeChild(textArea);
        }
    };

    const handleInputChange = (e) => {
        setContactInfo(e.target.value);
    };

    const handleConfirm = () => {
        axios.post('/add-payment-email', {
            orderId: order._id,
            trackingId: order.trackingId,
            contactInfo
        })
        .then(response => {
            setContactInfo('');
            toast.success('Payer information sent!');
        })
        .catch(error => {
            toast.error('Failed to send payer information');
        });
    };

    useEffect(() => {
        console.log(contactInfo)
    }, [contactInfo])

    return (
        <div className="font-sans my-4 p-4 sm:p-6 md:p-8 bg-bg rounded-lg shadow-sm text-subHeading_1">
          <div>
            <p className="text-sm sm:text-base">
              Send ${formData.amount} via <span className="text-purple-800 font-semibold">Zelle</span> or from your bank.
            </p>
      
            <p className="py-4 text-sm sm:text-base">
              Please use the Zelle information or QR code below, along with the order number as the memo:
            </p>
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-2">
                <p className="text-sm sm:text-base">Send:</p>
                <p className="text-purple-800 font-semibold mb-4 text-sm sm:text-base">
                  ${formData.amount} to {formData.email}
                </p>
      
                <p className="text-sm sm:text-base">Zelle Name:</p>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    name="name"
                    disabled
                    value={formData.name}
                    className="appearance-none border-2 py-1 pl-2 rounded-l-md border-purple-800 w-full sm:w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.name)}
                    className="px-3 rounded-r-md border border-purple-800 bg-purple-800 hover:bg-secondary transition-colors text-white text-sm"
                  >
                    <Clipboard className="h-5 w-5" />
                  </button>
                </div>
      
                <p className="mt-4 text-sm sm:text-base">Zelle Email:</p>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    name="email"
                    disabled
                    value={formData.email}
                    className="appearance-none border-2 py-1 pl-2 rounded-l-md border-purple-800 w-full sm:w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.email)}
                    className="px-3 rounded-r-md border bg-purple-800 border-purple-800 hover:bg-secondary transition-colors text-white text-sm"
                  >
                    <Clipboard className="h-5 w-5" />
                  </button>
                </div>
      
                <p className="mt-4 text-sm sm:text-base">Zelle Phone:</p>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    name="phone"
                    disabled
                    value={formData.phone}
                    className="appearance-none border-2 py-1 pl-2 rounded-l-md border-purple-800 w-full sm:w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.phone)}
                    className="px-3 rounded-r-md border bg-purple-800 border-purple-800 hover:bg-secondary transition-colors text-white text-sm"
                  >
                    <Clipboard className="h-5 w-5" />
                  </button>
                </div>
              </div>
      
              <div className="flex flex-col items-center mt-4 md:mt-0">
                <div className="bg-white max-w-xs p-4 border-2 rounded-lg border-purple-800">
                  <img src={QRCodeImg} alt="zelle-qr-code" />
                </div>
                <p className="text-sm mt-2">Scan with your Camera app.</p>
              </div>
            </div>
      
            <p className="mt-8 text-sm sm:text-base">
              Your Zelle Email/Phone Number (used to confirm payment): <span className="text-red-500 text-xl">*</span>
            </p>
            <div className="mt-2 flex space-x-2 sm:space-x-4 w-full sm:w-2/3">
              <input
                type="text"
                value={contactInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-black hover:border-purple-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="email@example.com or 9876543210"
              />
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg ${contactInfo === '' ? 'bg-gray-400' : 'bg-purple-800 hover:bg-secondary text-white'} font-semibold transition-colors`}
                disabled={contactInfo === ''}
              >
                Confirm
              </button>
            </div>
            <p className="text-sm mt-1 text-amber-900">
              After paying, enter your email/phone number and press <strong>confirm</strong>.
            </p>
            <p className="mt-8 text-sm sm:text-base">
              Once your payment is <strong>confirmed</strong> by our team, we will start <strong>processing your order</strong>.
            </p>
          </div>
        </div>
    );      
}

