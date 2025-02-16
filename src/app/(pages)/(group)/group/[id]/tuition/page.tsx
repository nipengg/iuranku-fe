"use client";

import Tabs from "@/components/Tabs";
import MemberPaymentTable from "@/components/Tuition/MemberPaymentTable";
import { useState } from "react";

export default function GroupTuition({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/setting`;
    const [activeTab, setActiveTab] = useState("Keamanan");
    const tabs = ["Keamanan", "Kebersihan", "Kematian"];

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
            <div className="text-black">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold">Fee Report</h1>
                    <div>
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
                </div>
                <div className="container mx-auto pb-6">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />
                    <div className="mt-6">
                        <MemberPaymentTable
                            key={activeTab}
                            groupId={params.id}
                            typeTuition={activeTab}
                            year={selectedYear}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
