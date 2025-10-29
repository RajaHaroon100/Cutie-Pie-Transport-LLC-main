import moment from 'moment';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function QuoteDetailCard( props ) {
    const [acceptBoxOpen, setAcceptBoxOpen] = useState(false);
    const [rejectBoxOpen, setRejectBoxOpen] = useState(false);

    useEffect( () => {
        handleClose();
    }, [props._id])

    function handleAccept() {
        handleClose()
        setAcceptBoxOpen(true);
        // toast('Give Quote!',
        //     {
        //       icon: '👇',
        //       style: {
        //         borderRadius: '10px',
        //         background: '#333',
        //         color: '#fff',
        //       },
        //     }
        //   );
    }

    function handleReject() {
        handleClose()
        setRejectBoxOpen(true);
    }

    function handleClose() {
        if (acceptBoxOpen === true)
            setAcceptBoxOpen(false)
        if (rejectBoxOpen === true)
            setRejectBoxOpen(false)
    }

    const handleSubmit = async (e) => {

    }

    return(
        <div className="font-sans">
            <h2 className="text-4xl font-bold ">{props.type} {props.detailType} Details</h2>
            <div className="flex mb-6 mt-1 text-sm">
                <h3>Requsted On</h3>
                <p className='ml-1 font-semibold'>{moment(props.requestedOn).format('DD-MM-YYYY')}</p>
            </div>

            {!props.title?
                <></>
                : 
                <p className="font-bold text-2xl mb-6">{props.title}</p>   
            }
            
            
            <div className="grid grid-cols-2 border-y-2 py-2 px-4 bg-gray-100">
                <div>
                    <h3 className='text-sm mb-1'>Request by</h3>
                    <p className='font-semibold'>{props.firstName} {props.lastName}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-1'>Company</h3>
                    <p className='font-semibold'>{props.company}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 border-b-2 py-2 px-4 bg-gray-50">
                <div>
                    <h3 className='text-sm mb-1'>Loading Date</h3>
                    <p className='font-semibold'>{moment(props.loadingDate).format('DD-MM-YYYY')}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-1'>Delivery Date</h3>
                    <p className='font-semibold'>{moment(props.deliveryDate).format('DD-MM-YYYY')}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 border-b-2 py-2 px-4 bg-gray-100">
                
                {!props.trailerSize?
                    <></>
                : 
                    <div>
                        <h3 className='text-sm mb-1'>Trailer Size</h3>
                        <p className='font-semibold'>{props.trailerSize}</p>
                    </div>
                }
                {!props.length?
                    <></>
                : 
                    <div>
                        <h3 className='text-sm mb-1'>Cargo Length</h3>
                        <p className='font-semibold'>{props.length} Feet</p>
                    </div>
                }
                {!props.equipmentType?
                    <></>
                : 
                    <div>
                        <h3 className='text-sm mb-1'>Equipment Type</h3>
                        <p className='font-semibold'>{props.equipmentType}</p>
                    </div>
                }
                {!props.equipmentSize?
                    <></>
                : 
                    <div>
                        <h3 className='text-sm mb-1'>Equipment Size</h3>
                        <p className='font-semibold'>{props.equipmentSize}</p>
                    </div>
                }
                <div>
                    <h3 className='text-sm mb-1'>Cargo Weight</h3>
                    <p className='font-semibold'>{props.weight} lbs</p>
                </div>
                {!props.equipment?
                    <></>
                : 
                    <div>
                        <h3 className='text-sm mb-1'>Equipment</h3>
                        <p className='font-semibold'>{props.equipment}</p>
                    </div>
                }
                {!props.commodity?
                    <></>
                : 
                    <div className='mt-2'>
                        <h3 className='text-sm mb-1'>Commodity</h3>
                        <p className='font-semibold'>{props.commodity}</p>
                    </div>
                }
            </div>

            <div className="grid grid-cols-2 border-b-2 py-2 px-4 bg-gray-50">
                <div>
                    <h3 className='text-sm mb-1'>Origin</h3>
                    <p className='font-semibold'>{props.origin}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-1'>Destination</h3>
                    <p className='font-semibold'>{props.destination}</p>
                </div>
            </div>

            {!props.description?
                <></>
                : 
                <div className='border-b-2 py-2 px-4 bg-gray-100'>
                    <h3 className='text-sm mb-1'>Description</h3>
                    <pre>
                        <p className='text-base font-semibold'>{props.description}</p>
                    </pre>
                </div>   
            }

            <div className="grid grid-cols-2 border-b-2 py-2 px-4 bg-gray-50">
                <div>
                    <h3 className='text-sm mb-1'>Phone Number</h3>
                    <p className='font-semibold'>{props.phoneNumber}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-1'>Email</h3>
                    <p className='font-semibold'>{props.email}</p>
                </div>
            </div>
            
            <div className='flex space-x-8 px-8 mt-8'>
                <button onClick={handleReject} className="w-full mb-4 border border-gray-900 bg-red-600 hover:bg-red-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300">
                    Reject
                </button>
                <button onClick={handleAccept} className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300">
                    Give Quote
                </button>
            </div>

            <div>
                {acceptBoxOpen === true?
                    <div className='m-4 p-4 border rounded-xl shadow-md'>
                        <div className='flex justify-end pt-1 pr-1'>
                            <button onClick={handleClose} className='text-sm font-semibold text-gray-400 hover:text-gray-700'>X</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <label htmlFor="quotePrice" className="block text-subHeading_1 font-bold mb-2">
                                    Give Quote Price
                                    <span className="text-red-500 text-xl ml-1">*</span>
                                    <span className='text-sm font-medium pl-2'>in USD</span>
                                </label>
                                <div className='flex'>
                                    <input
                                        type="number"
                                        id="quotePrice"
                                        name="quotePrice"
                                        //value={formData.quotePrice}
                                        //onChange={handleChange}
                                        className="w-full px-3 py-2 border border-black rounded-lg shadow-sm"
                                        placeholder='Enter only digits. e.g. 250'
                                       
                                        required
                                    />
                                </div>
                                
                            </div>
                            <div className="mb-6">
                                <label htmlFor="adminMessage" className="block text-subHeading_1 font-bold mb-2">
                                    Your Message for {props.firstName}
                                    <span className="text-red-500 text-xl ml-1">*</span>
                                </label>
                                <textarea
                                    id="adminMessage"
                                    name="adminMessage"
                                    // value={formData.description}
                                    // onChange={handleChange}
                                    className="w-full px-3 py-2 border border-black rounded-lg shadow-sm"
                                    rows="4"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mb-4 border border-gray-900 bg-gray-900 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                :
                    <></>
                }

                {rejectBoxOpen === true?
                    <div className='m-4 p-4 border rounded-xl shadow-md'>
                        <div className='flex justify-end pt-1 pr-1'>
                            <button onClick={handleClose} className='text-sm font-semibold text-gray-400 hover:text-gray-700'>X</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="adminMessage" className="block text-subHeading_1 font-bold mb-2">
                                    Your Message for {props.firstName}
                                    <span className="text-red-500 text-xl ml-1">*</span>
                                </label>
                                <textarea
                                    id="adminMessage"
                                    name="adminMessage"
                                    // value={formData.description}
                                    // onChange={handleChange}
                                    className="w-full px-3 py-2 border border-black rounded-lg shadow-sm"
                                    rows="4"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mb-4 border border-gray-900 bg-red-600 hover:bg-red-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300"
                            >
                                Reject Quote
                            </button>
                        </form>
                    </div>
                :
                    <></>
                }
            </div>
            
        </div>
    );
}
