"use client";

import PopUp from "@/components/PopUp";
import Tabs from "@/components/Tabs";
import { useState } from "react";

const TestingPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Set default to false
    const [activeTab, setActiveTab] = useState("Iuran Keamanan");

    const tabs = ["Iuran Keamanan", "Iuran Kebersihan", "Iuran Kematian"];

    const data = [
        {
            year: 2024,
            months: Array(12).fill(true),
        },
        {
            year: 2023,
            months: [
                true,
                false,
                true,
                true,
                true,
                false,
                true,
                true,
                true,
                true,
                true,
                true,
            ],
        },
        {
            year: 2021,
            months: [
                true,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                false,
                true,
            ],
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Testing Page</h1>
            {/* Button to trigger the popup */}
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                Open Popup
            </button>

            {/* Popup component */}
            {isOpen && (
                <PopUp
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Detail User"
                >
                    <div className="w-full max-w-screen-lg mx-auto p-4">
                        {/* User Info Section */}
                        <div className="flex flex-col items-start space-y-4 mb-6">
                            <h1 className="text-2xl font-bold">
                                Neville Cornelius Tjampan
                            </h1>
                            <p className="text-sm text-gray-500">User</p>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    <span className="font-medium">
                                        📞 Mobile Number:
                                    </span>{" "}
                                    085217295708
                                </p>
                                <p>
                                    <span className="font-medium">
                                        ✉️ Email:
                                    </span>{" "}
                                    nevillecorneliustjampan@gmail.com
                                </p>
                                <p>
                                    <span className="font-medium">
                                        📍 Address:
                                    </span>{" "}
                                    Jalan Bukit Bogor Raya Blok I No. 20
                                </p>
                            </div>
                        </div>
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                        <div className="overflow-x-auto mt-6">
                            <table className="table table-compact table-zebra w-full min-w-full text-center border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="border border-gray-300 px-4 py-2">
                                            Year
                                        </th>
                                        {[
                                            "January",
                                            "February",
                                            "March",
                                            "April",
                                            "May",
                                            "June",
                                            "July",
                                            "August",
                                            "September",
                                            "October",
                                            "November",
                                            "December",
                                        ].map((month) => (
                                            <th
                                                key={month}
                                                className="border border-gray-300 px-4 py-2"
                                            >
                                                {month}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, rowIndex) => (
                                        <tr
                                            key={row.year}
                                            className={
                                                rowIndex % 2 === 0
                                                    ? "bg-gray-50"
                                                    : ""
                                            }
                                        >
                                            <td className="border border-gray-300 px-4 py-2 font-bold">
                                                {row.year}
                                            </td>
                                            {row.months.map((isPaid, index) => (
                                                <td
                                                    key={index}
                                                    className={`border border-gray-300 px-4 py-2 ${
                                                        isPaid
                                                            ? "text-green-600 font-semibold"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {isPaid ? "✔️" : "✘"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </PopUp>
            )}
        </div>
    );
};

export default TestingPage;
