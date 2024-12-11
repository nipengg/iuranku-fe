"use client";

import React, { ReactNode } from "react";

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        className="btn btn-sm btn-outline"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="mt-4">{children}</div>
                {footer && (
                    <div className="mt-4 flex justify-end space-x-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopUp;
