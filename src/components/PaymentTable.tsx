"use client";

import React, { useState } from "react";
import Tabs from "./Tabs";

interface PaymentData {
    id: number;
    user: string;
    invoice: string;
    address: string;
    paymentDate: string;
    detail: string;
    status: "success" | "pending" | "rejected";
}

const PaymentTable: React.FC<{ type: string; data: PaymentData[] }> = ({
    type,
}) => {
    const data = [
        {
            id: 1,
            user: "Damar",
            invoice: "11230",
            address: "Bogor Blok I No 3",
            paymentDate: "03 January 2024",
            detail: "Invoice #001 Detail",
            status: "pending",
        },
        {
            id: 2,
            user: "Damar",
            invoice: "11230",
            address: "Bogor Blok I No 3",
            paymentDate: "03 January 2024",
            detail: "Invoice #002 Detail",
            status: "pending",
        },
    ];
    return (
        <div className="overflow-x-auto text-black mt-6">
            <table className="table w-full">
                {/* Table Head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Invoice</th>
                        <th>Address</th>
                        <th>Payment Date</th>
                        <th>Invoice Detail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.user}</td>
                            <td>{item.invoice}</td>
                            <td>{item.address}</td>
                            <td>{item.paymentDate}</td>
                            <td>
                                <button className="btn btn-outline btn-success btn-sm">
                                    View
                                </button>
                            </td>
                            <td>
                                <div className="flex space-x-2">
                                    <button className="btn btn-success btn-sm">
                                        Accept
                                    </button>
                                    <button className="btn btn-error btn-sm">
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MemberPaymentSection: React.FC = () => {
    const [year, setYear] = useState(2024);
    const [statusApproval, setStatus] = useState("Waiting for Approval");

    // Dummy data

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-end gap-2 items-center mb-4">
                <select
                    className="select select-bordered w-42"
                    value={statusApproval}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {["Waiting for Approval", "Rejected", "Approved"].map(
                        (status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        )
                    )}
                </select>
                <select
                    className="select select-bordered w-28"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {[2023, 2024, 2025].map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end mt-4">
                <div className="join">
                    <button className="join-item btn">«</button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button key={page} className="join-item btn">
                            {page}
                        </button>
                    ))}
                    <button className="join-item btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentTable;
