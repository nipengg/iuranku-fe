"use client";

import GeneralSettings from "@/components/Settings/GeneralSettings";
import TuitionSettings from "@/components/Settings/TuitionSettings";
import Tabs from "@/components/Tabs";
import { TUITION_TYPE } from "@/constant";
import { useState } from "react";

export default function GroupSetting({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/setting`;
    const [activeTab, setActiveTab] = useState("General Settings");
    const tabs = [
        "General Settings",
        "Iuran Keamanan",
        "Iuran Kebersihan",
        "Iuran Kematian",
    ];

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold">Group Settings</h1>
                </div>
                <div className="container mx-auto pb-6">
                    {/* Tabs Component */}
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />
                    <div className="mt-6">
                        {activeTab === "General Settings" && (<GeneralSettings />)}
                        {Object.entries(TUITION_TYPE).map(([key, value]) => (
                            activeTab === `Iuran ${value.tuitionName}` && (
                                <TuitionSettings key={key} tuitionTypeKey={value.tuitionName} groupId={params.id} />
                            )
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
