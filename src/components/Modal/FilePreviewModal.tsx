import { BACKEND_STORAGE } from "@/constant";
import React, { useState } from "react";

interface FilePreviewModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    url: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
    isModalOpen,
    onClose,
    url,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    if (!isModalOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">File Preview</h2>
                <div className="flex justify-center items-center">
                    {isLoading && <p>Loading...</p>}
                    <img
                        src={`/api/proxyImage?url=${encodeURIComponent(
                            BACKEND_STORAGE + url
                        )}`}
                        alt="Image Preview"
                        className={`max-w-full h-auto rounded-md mt-4 ${
                            isLoading ? "hidden" : "block"
                        }`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                </div>
                <div className="modal-action">
                    <button
                        className="btn bg-custom-green-light text-white"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
