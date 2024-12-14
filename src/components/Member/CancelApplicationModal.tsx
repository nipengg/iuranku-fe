import React from "react";

interface CancelApplicationModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    onConfirmCancel: (selectedApplicationId: number) => void;
    applicationId: number;
}

const CancelApplicationModal: React.FC<CancelApplicationModalProps> = ({
    isModalOpen,
    onClose,
    onConfirmCancel,
    applicationId
}) => {

    const handleCancel = () => {
        if (applicationId) {
            onConfirmCancel(applicationId);
        }
        onClose();
    };

    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                <p className="mb-4">This action cannot be undone.</p>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn bg-red-500 text-white"
                        onClick={handleCancel}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelApplicationModal;
