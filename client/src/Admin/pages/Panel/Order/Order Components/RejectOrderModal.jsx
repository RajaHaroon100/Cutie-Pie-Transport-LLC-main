import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RejectOrderModal = ({ isOpen, onRequestClose, onReject, handleChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
            contentLabel="Reject Order"
            className="w-11/12 max-w-lg mx-auto my-20 bg-white rounded-lg shadow-lg p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="flex justify-end">
                <button onClick={onRequestClose} className="text-sm font-semibold text-gray-400 hover:text-gray-700">X</button>
            </div>
            <form onSubmit={onReject}>
                <div className="mb-6">
                    <label htmlFor="adminMessage" className="block text-subHeading_1 font-bold mb-2">
                        Reason
                    </label>
                    <textarea
                        id="adminMessage"
                        name="adminMessage"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-black rounded-lg shadow-sm"
                        rows="4"
                    />
                </div>
                <p className='text-sm text-amber-900 mb-2'>Once an order rejected. It will be deleted forever.</p>
                <button
                    type="submit"
                    className="w-full mb-4 border border-gray-900 bg-red-600 hover:bg-red-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300"
                >
                    Reject Order
                </button>
            </form>
        </Modal>
    );
};

export default RejectOrderModal;
