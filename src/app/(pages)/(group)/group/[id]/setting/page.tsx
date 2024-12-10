"use client";

import GeneralSettings from "@/components/GeneralSettings";
import KeamananSettings from "@/components/KeamananSettings";
import KebersihanSettings from "@/components/KebersihanSettings";
import KematianSettings from "@/components/KematianSettings";
import Tabs from "@/components/Tabs";
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
                        {activeTab === "General Settings" && (
                            <GeneralSettings />
                        )}
                        {activeTab === "Iuran Keamanan" && <KeamananSettings />}
                        {activeTab === "Iuran Kebersihan" && (
                            <KebersihanSettings />
                        )}
                        {activeTab === "Iuran Kematian" && <KematianSettings />}
                    </div>
                    <button className="btn btn-success btn-sm mt-12 btn-wide">
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
