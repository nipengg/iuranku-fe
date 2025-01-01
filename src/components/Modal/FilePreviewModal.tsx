import { BACKEND_STORAGE } from "@/constant";
import React from "react";

interface FilePreviewModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    url: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
    isModalOpen,
    onClose,
    url
}) => {

    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">File Preview</h2>
                <img
                    src={`/api/proxyImage?url=${encodeURIComponent(BACKEND_STORAGE + url)}`}
                    alt="Image Preview"
                    className="max-w-full h-auto rounded-md mt-4"
                />
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
