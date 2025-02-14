import React, { useState } from "react";
import Tabs from "../Tabs";
import { GroupMember } from "@/model/Master/GroupModel";
import { Tuition } from "@/model/Master/Tuition";
import { formatRupiah } from "@/utils/format";
import moment from "moment";

interface TuitionPaymentDetailModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    tuitions: Tuition[];
}

const TuitionPaymentDetailModal: React.FC<TuitionPaymentDetailModalProps> = ({
    isModalOpen,
    onClose,
    tuitions,
}) => {
    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box w-[1100px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">
                    Detail Contribution Payment
                </h2>
                <div className="w-full max-w-screen-xl mx-auto p-4">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-left">ID</th>
                                <th className="text-left">Amount</th>
                                <th className="text-left">Payment Date</th>
                                <th className="text-left">
                                    Request Contribution Date
                                </th>
                                <th className="text-left">
                                    Request Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitions.length <= 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No data available.
                                    </td>
                                </tr>
                            ) : (
                                tuitions.map((item: Tuition, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>#{item.id}</td>
                                            <td>
                                                {formatRupiah(item.nominal)}
                                            </td>
                                            <td>
                                                {moment(
                                                    item.created_at?.toString()
                                                ).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                            </td>
                                            <td>
                                                {moment(
                                                    item.request_tuition.created_at?.toString()
                                                ).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                            </td>
                                            <td>
                                                {item.request_tuition.remark}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
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

export default TuitionPaymentDetailModal;
