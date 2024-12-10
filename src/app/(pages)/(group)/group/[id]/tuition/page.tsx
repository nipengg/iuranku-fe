"use client";

import MemberPaymentTable from "@/components/MemberPaymentTable";
import Tabs from "@/components/Tabs";
import { useState } from "react";

export default function GroupTuition({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/setting`;
    const [activeTab, setActiveTab] = useState("Iuran Keamanan");
    const tabs = ["Iuran Keamanan", "Iuran Kebersihan", "Iuran Kematian"];
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
                        {activeTab === "Iuran Keamanan" && (
                            <MemberPaymentTable />
                        )}
                        {activeTab === "Iuran Kebersihan" && (
                            <MemberPaymentTable />
                        )}
                        {activeTab === "Iuran Kematian" && (
                            <MemberPaymentTable />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
