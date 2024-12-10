"use client";

import { useState } from "react";
import Tabs from "@/components/Tabs";
import PaymentTable from "@/components/PaymentTable";

export default function GroupTuitionRequest({
    params,
}: {
    params: { id: string };
}) {
    const baseUrl = `/group/${params.id}/setting`;
    const [activeTab, setActiveTab] = useState("Iuran Keamanan");
    const tabs = ["Iuran Keamanan", "Iuran Kebersihan", "Iuran Kematian"];

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold">
                        Group Tuition Request
                    </h1>
                </div>
                <div className="container mx-auto pb-6">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />
                    {tabs.map(
                        (tab) =>
                            activeTab === tab && (
                                <PaymentTable key={tab} type={tab} />
                            )
                    )}
                    <div className="mt-6"></div>
                </div>
            </div>
        </>
    );
}
