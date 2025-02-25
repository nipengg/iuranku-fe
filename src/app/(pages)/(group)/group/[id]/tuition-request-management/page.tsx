"use client";

import ApprovalRequestTuition from "@/components/RequestTuitionManagement/ApprovalRequestTuition";
import RequestManagement from "@/components/RequestTuitionManagement/RequestManagement";
import { useState } from "react";

export default function TuitionRequestApproval({
    params,
}: {
    params: { id: string };
}) {
    const [activeTab, setActiveTab] = useState("Approval");

    const tabs = ["Approval", "Request Management"];

    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const futureYears = 1;
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = Array.from(
        { length: currentYear + futureYears - startYear + 1 },
        (_, index) => startYear + index
    );

    const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <h1 className="text-4xl font-bold">
                    Fee Request Management
                </h1>
                <select
                    className="select select-bordered w-28 mr-3"
                    name="tuition_period"
                    value={selectedYear}
                    onChange={handleChangePeriod}
                >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>
            <div className="container mx-auto pb-8">
                <div className="border-b border-gray-300">
                    <nav className="flex space-x-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-lg ${
                                    activeTab === tab
                                        ? "border-b-2 border-custom-green-light text-custom-green-light"
                                        : "text-custom-green-primary hover:text-custom-green-primary"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === "Approval" && (
                        <ApprovalRequestTuition
                            groupId={params.id}
                            period={selectedYear}
                        />
                    )}
                    {activeTab === "Request Management" && (
                        <RequestManagement
                            groupId={params.id}
                            period={selectedYear}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
