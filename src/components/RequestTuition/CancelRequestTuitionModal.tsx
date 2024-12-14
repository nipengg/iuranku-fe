import { handleRequestTuition } from "@/lib/features/tuitionRequestSlice";
import { AppDispatch } from "@/lib/store";
import { HandleRequestTuitionForm } from "@/model/Master/RequestTuition";
import { StatusCodes } from "http-status-codes";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface CancelRequestTuitionModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    requestId: number;
    refreshTable: () => void;
}

const CancelRequestTuitionModal: React.FC<CancelRequestTuitionModalProps> = ({
    isModalOpen,
    onClose,
    requestId,
    refreshTable
}) => {

    const dispatch = useDispatch<AppDispatch>();

    const handleCancelSubmit = () => {
        const cancelForm: HandleRequestTuitionForm = {
            status: "Canceled",
            request_tuition_id: requestId
        };

        dispatch(handleRequestTuition(cancelForm)).then((res: any) => {
            if (res.error) throw res;
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Request Canceled`);
                refreshTable();
                onClose();
            }
        }).catch(function (err: any) {
            console.log(err);
            if (err.payload !== undefined) {
                toast.error(`Canceled Failed. ${err.payload.result.error}`);
            } else {
                toast.error(`Something went wrong...`);
            }
        });
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
                        onClick={handleCancelSubmit}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelRequestTuitionModal;
