"use client";
import { FC } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    newsTitle: string;
}

const DeleteNewsModal: FC<ModalProps> = ({ isOpen, onClose, onConfirm, newsTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Confirm Deletion</h3>
                    <button onClick={onClose} className="text-xl">
                        <FaTimes />
                    </button>
                </div>
                <div className="mt-4">
                    <p>Are you sure you want to delete the news: <strong>{newsTitle}</strong>?</p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={onClose} className="btn btn-outline btn-sm">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="btn btn-danger btn-sm">
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNewsModal;
