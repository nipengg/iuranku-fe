import { BACKEND_STORAGE } from "@/constant";
import { insertRequestTuition } from "@/lib/features/tuitionRequestSlice";
import { AppDispatch } from "@/lib/store";
import { InsertRequestTuitionForm, InsertRequestTuitionFormInitial } from "@/model/Master/RequestTuition";
import { User } from "@/model/Master/UserModel";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface RequestTuitionModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    user: User;
    groupId: string;
    refreshTable: () => void;
}

const RequestTuitionModal: React.FC<RequestTuitionModalProps> = ({
    isModalOpen,
    onClose,
    user,
    groupId,
    refreshTable,
}) => {

    const [form, setForm] = useState<InsertRequestTuitionForm>({ ...InsertRequestTuitionFormInitial });
    const [imageHandle, setImageHandle] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: any) => {
        if (e.target.name === "file") {
            const file = e.target.files[0];
            setForm((prevState) => ({
                ...prevState,
                file: e.target.files ? e.target.files[0] : null,
            }));

            handleImage(file);
        } else {
            setForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const updatedForm: InsertRequestTuitionForm = {
            ...form,
            user_id: user.id,
            group_id: Number.parseInt(decryptData(decodeURIComponent(groupId)))
        };

        dispatch(insertRequestTuition(updatedForm)).then((res: any) => {
            if (res.error) throw res;
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Request Saved`);
                setForm({ ...InsertRequestTuitionFormInitial });
                refreshTable();
                onClose();
            }
        }).catch(function (err: any) {
            if (err.payload !== undefined) {
                toast.error(`Insert Failed. ${err.payload.result.error}`);
            } else {
                toast.error(`Something went wrong...`);
            }
        });
    };

    const handleImage = async (file: File) => {
        try {

            setImageHandle(true);
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/processImage", {
                method: "POST",
                body: formData,
            });
            setImageHandle(false);
            if (!res.ok) {
                throw new Error("Failed to upload image");
            }

            const jsonResponse = await res.json();
            console.log("Image upload response:", jsonResponse);

            setForm((prevState) => ({
                ...prevState,
                nominal: parseFloat(jsonResponse.amount),
            }));
        } catch (err: any) {
            console.error("Error uploading image:", err.message);
        }
    };

    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box w-[800px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">Send Request</h2>
                <form className="space-y-2">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm font-bold">
                                Transfer File
                            </span>
                        </label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            className="file-input file-input-bordered file-input-sm w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm font-bold">
                                Nominal
                            </span>
                        </label>
                        <input
                            type="number"
                            name="nominal"
                            placeholder="Nominal"
                            value={form.nominal}
                            onChange={handleChange}
                            className="input input-bordered input-sm w-full"
                            disabled={imageHandle ? true : false}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm font-bold">
                                Remark
                            </span>
                        </label>
                        <input
                            type="text"
                            name="remark"
                            placeholder="Remark"
                            onChange={handleChange}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                </form>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Close
                    </button>
                    <button className="btn bg-custom-green-primary text-white" onClick={handleSubmit} disabled={imageHandle ? true : false}>
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestTuitionModal;
