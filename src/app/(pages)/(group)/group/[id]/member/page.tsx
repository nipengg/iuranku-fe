"use client";

import MemberTable from "@/components/MemberTable";
import Tabs from "@/components/Tabs";
import { useState } from "react";

export default function GroupMember({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/member`;
    const actions = [{ label: "Invite", action: () => console.log("Invite") }];
    const [activeTab, setActiveTab] = useState("Iuran Keamanan");
    const tabs = ["Iuran Keamanan", "Iuran Kebersihan", "Iuran Kematian"];
    return (
        <>
            <div className="text-black">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Group Member</h1>
                </div>
                <div className="container mx-auto pb-6">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />
                    <div className="mt-4">
                        {activeTab === "Iuran Keamanan" && <MemberTable />}
                        {activeTab === "Iuran Kebersihan" && <MemberTable />}
                        {activeTab === "Iuran Kematian" && <MemberTable />}
                    </div>
                </div>
            </div>
        </>
    );
}
