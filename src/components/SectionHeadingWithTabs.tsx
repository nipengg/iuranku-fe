"use client";

import { useState } from "react";
import MemberTable from "./MemberTable";

export default function SectionHeadingWithTabs() {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = ["Joined Members", "Invited Members", "Leave Members"];
    const actions = [{ label: "Invite", action: () => console.log("Invite") }];

    return (
        <div className="container mx-auto pb-8">
            <div className="border-b border-gray-300">
                <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-lg ${
                                activeTab === tab
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === "Joined Members" && <MemberTable />}
                {activeTab === "Invited Members" && <MemberTable />}
                {activeTab === "Leave Members" && <MemberTable />}
            </div>
        </div>
    );
}
