import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UpdateCheckpointsModal = ({ isOpen, onRequestClose, pickupLocation, pickupCountry, deliveryLocation, deliveryCountry, checkpoints, onUpdate }) => {
    const [localCheckpoints, setLocalCheckpoints] = useState([]);

    useEffect(() => {
        setLocalCheckpoints([...checkpoints]);
    }, [checkpoints]);

    const handleCheckboxChange = (index) => {
        const updatedCheckpoints = localCheckpoints.map((checkpoint, i) => {
            if (i === index) {
                return { ...checkpoint, status: !checkpoint.status };
            }

            if (i > index && checkpoint.status === true) {
                return { ...checkpoint, status: false };
            }
            return checkpoint;
        });
        setLocalCheckpoints(updatedCheckpoints);
    };

    const handleSave = () => {
        onUpdate(localCheckpoints);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
            contentLabel="Update Checkpoints"
            className="w-11/12 max-w-lg mx-auto my-20 bg-white rounded-lg shadow-lg p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className='mb-8'>
                <h2 className="font-bold text-xl">Update Checkpoints</h2>
                <p className='text-xs text-orange-900'>Mark the checkbox where shipment has reached.</p>
            </div>

            <div className="mb-4">
                <p className='font-semibold text-gray-800'>{pickupLocation}, {pickupCountry} <span className='text-sm text-gray-500'>(Pickup Point)</span></p>
            </div>

            <div className="my-4">
                {localCheckpoints.map((checkpoint, index) => (
                    <div key={checkpoint._id} className="flex items-center justify-between px-8 my-2">
                        <span className="truncate">{index + 1}: {checkpoint.location}</span>
                        <input
                            type="checkbox"
                            checked={checkpoint.status}
                            onChange={() => handleCheckboxChange(index)}
                            disabled={index > 0 && !localCheckpoints[index - 1].status}
                            className='p-2 appearance-none border border-gray-800 hover:border-blue-600 rounded-sm checked:bg-gray-800 disabled:border-gray-300'
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4 mb-8">
                <p className='font-semibold text-gray-800'>{deliveryLocation}, {deliveryCountry} <span className='text-sm text-gray-500'>(Delivery Point)</span></p>
            </div>

            <div className="flex space-x-4">
                <button 
                    className="bg-gray-300 text-black w-full py-2 px-4 rounded-lg cursor-pointer"
                    onClick={onRequestClose}>
                        Cancel
                </button>
                <button 
                    className="bg-gray-900 hover:bg-gray-600 text-white w-full py-2 px-4 rounded-lg"
                    onClick={handleSave}>
                        Save
                </button>
            </div>
        </Modal>
    );
};

export default UpdateCheckpointsModal;
