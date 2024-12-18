"use client";

import Tabs from "@/components/Tabs";
import MemberPaymentTable from "@/components/Tuition/MemberPaymentTable";
import { useState } from "react";

export default function GroupTuition({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/setting`;
    const [activeTab, setActiveTab] = useState("Keamanan");
    const tabs = ["Keamanan", "Kebersihan", "Kematian"];
    return (
        <>
            <div className="text-black">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold">Group Tuition</h1>
                </div>
                <div className="container mx-auto pb-6">
                    {/* Tabs Component */}
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />

                    {/* Render Table Based on Active Tab */}
                    <div className="mt-6">
                        <MemberPaymentTable key={activeTab} groupId={params.id} typeTuition={activeTab} />
                    </div>
                </div>
            </div>
        </>
    );
}
