import React, { ReactNode } from "react";

interface HandleInvitationModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isAccept: boolean;
}

const HandleInvitationModal: React.FC<HandleInvitationModalProps> = ({
    isOpen,
    title,
    children,
    onClose,
    onConfirm,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    isAccept,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        {cancelLabel}
                    </button>
                    {onConfirm && (
                        <button
                            className={`btn ${isAccept ? "bg-custom-green-primary" : "bg-red-500"} text-white`}
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HandleInvitationModal;
