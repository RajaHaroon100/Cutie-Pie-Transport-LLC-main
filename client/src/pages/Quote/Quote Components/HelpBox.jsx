import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

 const HelpBox = ({ isOpen, onClose, helpbox, title, svg }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 60,
            },
            content: {
                color: '#111827',
                background: '#fff7ed',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                textAlign: 'left',
                borderRadius: '12px',
                maxHeight: '85vh',
                padding: 0,
                overflowY: 'auto',
                width: '90%',  // Updated for responsiveness
                maxWidth: '600px',
            },
        }}
    >
        <div className='font-sans'>
            <div className='flex sticky top-0 bg-bg p-4 shadow-md'>
                <p
                    onClick={onClose}
                    aria-label="Close help box" // Added for accessibility
                    className='cursor-pointer font-semibold text-gray-400 hover:text-gray-900 text-2xl'
                >
                    x
                </p>
            </div>

            <div className='flex flex-col items-center py-6 px-4 sm:px-12'>
                <img className='max-w-44 min-w-44 mb-4' src={svg} alt="help-img" />
                <h2 className='text-2xl font-bold text-heading_1'>{title}</h2>
                <p className='text-center p-4 sm:p-6 bg-accent rounded-lg mt-4 font-semibold text-text_1'>{helpbox.description}</p>
            
                <div className='w-full mt-4 p-4 sm:p-6 rounded-lg border border-primary' dangerouslySetInnerHTML={{ __html: helpbox.instructions }} />
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-3 font-semibold bg-primary hover:bg-secondary text-secondary hover:text-gray-100 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </Modal>
);


export default HelpBox;
