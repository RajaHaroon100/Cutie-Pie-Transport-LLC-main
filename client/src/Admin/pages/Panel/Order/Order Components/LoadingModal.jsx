import React from 'react';
import Modal from 'react-modal';

const LoadingModal = ({ isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            className="flex items-center justify-center h-full"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
        >
            <div className="bg-white p-6 rounded-lg">
                <p className="text-center font-semibold">Please wait...</p>
            </div>
        </Modal>
    );
};

export default LoadingModal;
