"use client";
import { useState } from "react";

const MemberPaymentTable: React.FC = () => {
    const [year, setYear] = useState(2024);

    const users = [
        "Damar",
        "Sherleen",
        "Neville",
        "Michael",
        "Hari",
        "Arya",
        "Oping",
    ];

    const months = [
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
    ];

    return (
        <div className="overflow-x-auto p-6">
            <div className="flex justify-between items-center mb-4">
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

            {/* Table */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="text-left">User</th>
                        {months.map((month) => (
                            <th key={month} className="text-center">
                                {month}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, userIndex) => (
                        <tr key={userIndex}>
                            <td>{user}</td>
                            {months.map((month, monthIndex) => (
                                <td key={monthIndex} className="text-center">
                                    <span className="text-green-500">✔</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default MemberPaymentTable;
