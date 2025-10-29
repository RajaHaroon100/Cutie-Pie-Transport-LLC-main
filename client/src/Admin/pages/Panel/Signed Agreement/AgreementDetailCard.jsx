import React from 'react';
import moment from 'moment';

const AgreementDetailCard = ({ agreement }) => {
    if (!agreement) return null;

    return (
        <div className="p-6 font-sans">
            <h2 className="text-xl font-semibold mb-6 pb-2">Agreement Details</h2>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <h3 className="font-medium mb-2 border-b border-gray-300 pb-2">Signed By</h3>
                    <p className="text-gray-700">{agreement.signed}</p>
                </div>
    
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <h3 className="font-medium mb-2 border-b border-gray-300 pb-2">Signed Date</h3>
                    <p className="text-gray-700">{moment(agreement.date).format('MMMM Do, YYYY')}</p>
                </div>
    
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <h3 className="font-medium mb-2 border-b border-gray-300 pb-2">IP Address</h3>
                    <p className="text-gray-700">{agreement.ip}</p>
                </div>
    
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-1 md:col-span-2">
                    <h3 className="font-medium mb-2 border-b border-gray-300 pb-2">Location Data</h3>
                    <div className="space-y-2">
                        <div className='grid grid-cols-3 gap-x-2 pb-2 border-b'>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>City</strong></p>
                                <p className="text-gray-700">{agreement.ipData.city}</p>
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>Zip Code</strong></p>
                                <p className="text-gray-700">{agreement.ipData.zipcode}</p>
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>Country</strong></p>
                                <p className="text-gray-700">{agreement.ipData.country_name}</p>
                            </div>
                        </div>

                        <div className='border-b pb-2'>
                            <p className="text-gray-700 text-sm"><strong>Location Coordinates</strong></p>
                            <p className="text-gray-700">{agreement.ipData.latitude}, {agreement.ipData.longitude}</p>
                        </div>
                        
                        <div className='grid grid-cols-3 gap-x-2 border-b pb-2'>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>Currency</strong></p>
                                <p className="text-gray-700">{agreement.ipData.currency.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>Time Zone</strong></p>
                                <p className="text-gray-700">{agreement.ipData.time_zone.name}</p>

                            </div>
                            <div>
                                <p className="text-gray-700 text-sm"><strong>Calling Code</strong></p>
                                <p className="text-gray-700">{agreement.ipData.calling_code}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-700 text-sm"><strong>ISP</strong></p>
                            <p className="text-gray-700">{agreement.ipData.isp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default AgreementDetailCard;

