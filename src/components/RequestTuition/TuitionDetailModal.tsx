import React, { useState } from "react";
import { Tuition } from "@/model/Master/Tuition";
import { formatRupiah } from "@/utils/format";
import moment from "moment";

interface TuitionDetailModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    tuitions: Tuition[];
}

const TuitionDetailModal: React.FC<TuitionDetailModalProps> = ({
    isModalOpen,
    onClose,
    tuitions
}) => {

    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box w-[1100px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">Detail Tuition Payment</h2>
                <div className="w-full max-w-screen-xl mx-auto p-4">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-left">ID Tuition</th>
                                <th className="text-left">Periode</th>
                                <th className="text-left">Type Tuition</th>
                                <th className="text-left">Payment Date</th>
                                <th className="text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitions.length <= 0 ? 
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">No data available.</td>
                            </tr> :
                                tuitions.map((item: Tuition, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>#{item.id}</td>
                                            <td>{moment(item.period).format("MMM YYYY")}</td>
                                            <td>{item.type_tuition.tuition_name}</td>
                                            <td>{moment(item.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                            <td>{formatRupiah(item.nominal)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>Total</td>
                                <td><strong>{formatRupiah(Object.values(tuitions).reduce((a, b) => a + b.nominal, 0))}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetailModal;
