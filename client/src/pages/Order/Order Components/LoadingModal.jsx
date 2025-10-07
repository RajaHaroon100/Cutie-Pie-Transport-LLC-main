import Modal from 'react-modal';

export const LoadingModal = ({ isOpen }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={() => {}}
        shouldCloseOnOverlayClick={false}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            },
            content: {
                color: '#111827',
                background: '#f97316',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                padding: '2rem',
                fontSize: '16px',
                borderRadius: '12px',
            }
        }}
    >
        <h2>Please Wait...</h2>
    </Modal>
);